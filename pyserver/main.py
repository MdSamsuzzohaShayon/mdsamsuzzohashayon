# Do not include this in AWS Lambda
# ====================================START======================================= #
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.
# =====================================END====================================== #

import boto3
import json
import urllib3
import os
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import FastAPI, status, HTTPException
from mangum import Mangum
from pydantic import BaseModel



def send_contact_email(name: str, email: str, subject: str, phone: str, message: str):
    smtp_server: str = os.getenv("ADMIN_EMAIL_HOST")
    port: int = int(os.getenv("ADMIN_EMAIL_PORT"))  # For starttls
    password: str = os.getenv("ADMIN_EMAIL_HOST_PASSWORD")
    sender_email = os.getenv("ADMIN_EMAIL_USER")
    receiver_email = "mdshayon0@gmail.com"
    formatted_message = MIMEMultipart("alternative")
    formatted_message["Subject"] = "Contact request: " + subject
    formatted_message["From"] = sender_email
    formatted_message["To"] = receiver_email
    formatted_message.add_header("reply-to", email)

    # Create the plain-text and HTML version of your message
    text = "A new contact request is been sent"
    html = (
        f"<html>"
        + f"<body>"
        + f"<h4>Name: {name}</h4>"
        + f"<h4>Subject: {subject}</h4>"
        + f"<h4>Phone: {phone}</h4>"
        + f"<h4>Email: {email}</h4>"
        + f"<br />"
        + f"<h4>Message</h4>"
        + f"<p style='color: rgb(24, 237, 70);'>{message}</p>"
        + f"</body>"
        + f"</html>"
    )

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    formatted_message.attach(part1)
    formatted_message.attach(part2)

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        # Create secure connection with server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, formatted_message.as_string())
    except Exception as e:
        # Print any error messages to stdout
        print(e)


# send_email("abc", "msg", "Phone")

app = FastAPI(
    docs_url=None,  # Disable docs (Swagger UI)
    redoc_url=None,  # Disable redoc
)
handler = Mangum(app)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SendEmailModal(BaseModel):
    name: str
    email: str
    subject: str
    phone: str
    message: str


@app.post("/api/sendemail")
def make_contact(send_email: SendEmailModal):
    try:
        name = send_email.name
        email = send_email.email
        subject = send_email.subject
        phone = send_email.phone
        message = send_email.message

        # data = {"name": name, "email": email, "subject": subject, "phone": phone, "message": message}
        # # Add a new doc in collection 'cities' with ID 'LA'
        # db.collection("cities").document("LA").set(data)

        send_contact_email(
            name=name, email=email, subject=subject, phone=phone, message=message
        )
        json_compatible_data = jsonable_encoder(send_email)
        return JSONResponse(
            content=json_compatible_data, status_code=status.HTTP_201_CREATED
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail="Item not found")
    

@app.get('/api/updatepolicy')
def update_s3_policy_for_cloudflare():
    try:
        """
        CloudFlare connection -> to get all ip addresses -> Cloudflare/JD Cloud IP Details
        Docs -> https://api.cloudflare.com/client/v4/ips
        curl -X GET https://api.cloudflare.com/client/v4/ips -H 'Content-Type: application/json'
        """
        http = urllib3.PoolManager()
        r = http.request('GET', 'https://api.cloudflare.com/client/v4/ips')
        json_content = json.loads(r.data)
        ipv4 = json_content["result"]["ipv4_cidrs"]
        ipv6 = json_content["result"]["ipv6_cidrs"]
        ip_list = ipv4 + ipv6
        
        """
        Change policy for AWS S3 Bucket -> A bucket’s policy can be set by calling the put_bucket_policy method.
        Docs -> https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-example-bucket-policies.html
        API Reference -> https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketPolicy.html
        """
        s3 = boto3.client('s3')
        bucket_name = os.environ['AWS_S3_BUCKET_NAME']
        bucket_policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "PublicReadForGetBucketObjects",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": "s3:GetObject",
                    "Resource": f"arn:aws:s3:::{bucket_name}/*",
                    "Condition": {
                        "IpAddress": {
                            "aws:SourceIp": ip_list
                        }
                    }
                }
            ]
        }
        bucket_policy = json.dumps(bucket_policy)
        s3.put_bucket_policy(Bucket=bucket_name, Policy=bucket_policy) 
    except Exception as e:
        raise HTTPException(status_code=404, detail="Item not found")

