import logging
import os
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel
import azure.functions as func

"""
export PYENV=development
printenv PYENV
"""
if os.environ.get('PYENV') and os.environ.get('PYENV') == 'development':
    from dotenv import load_dotenv
    load_dotenv()

app = FastAPI(
    # docs_url=None,  # Disable docs (Swagger UI)
    # redoc_url=None,  # Disable redoc
)

origins = [
    "http://mdshayon.com",
    "https://mdshayon.com",
    "http://localhost",
    "http://localhost:7071",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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



class SendEmailModal(BaseModel):
    name: str
    email: str
    subject: str
    phone: str
    message: str


@app.get("/api/test")
def test_api():
    try:
        return {"message": "Send email with Azure Functions - update backend"}
    except Exception as e:
        raise HTTPException(status_code=404, detail="Item not found")

@app.post("/api/sendemail")
def make_contact(send_email: SendEmailModal):
    try:
        name = send_email.name
        email = send_email.email
        subject = send_email.subject
        phone = send_email.phone
        message = send_email.message

        # data = {"name": name, "email": email, "subject": subject, "phone": phone, "message": message}
        # print(data)
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
        print("Error: ",e)
        raise HTTPException(status_code=406, detail="Invalid request")
    

# Code for Azure functions
def main(req: func.HttpRequest, context: func.Context) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    # To get the invocation context of a function when it's running, include the context argument in its signature.
    # https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-python?source=recommendations&tabs=asgi%2Capplication-level&pivots=python-mode-configuration#context
    return func.AsgiMiddleware(app).handle(req, context)