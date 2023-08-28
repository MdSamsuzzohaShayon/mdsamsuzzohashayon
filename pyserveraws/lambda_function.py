# Do not add this with API 
# Create a new lambda function and just copy paste the code
import boto3
import json
import urllib3
import os

def lambda_handler(event, context):
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