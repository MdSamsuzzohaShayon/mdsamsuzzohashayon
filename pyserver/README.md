# FastAPI AWS Lambda
 - [Tutorial](https://www.youtube.com/watch?v=7-CvGFJNE_o), [Tutorial 2](https://www.youtube.com/watch?v=rpVLOVeky6A)
 - Install packages into <dir>. By default this will not replace existing files/folders in <dir>.
    ```
    pip install -t dependencies -r requirements.txt
    ```
 - We need to bundle our **dependencies** folder with out main.py file
 - Create a zip file with all of our dependencies 
    ```
    (cd  dependencies; zip ../lambda_artifact.zip -r .)
    ```
 - Adding our main.py file to existing zip file
    ```
    zip lambda_artifact.zip -u main.py
    ```
 - From aws console -> Use function URLs to assign HTTP(S) endpoints to your Lambda function. -> *Enable function URL* -> set auth type *NONE*
 - Make sure to use same version of python in Aws lambda and in my local environment (We should use 3.10 for now)
 - Now we will get a url called **Function URL** 
 - Upload our zip file to aws lambda function
 - **Check logs** -> monitor -> View CloudWatch logs -> click on most recent log -> and see error log
 - Now change handler from code -> Runtime settings edit -> change handler name to `main.handler` (We have out main.py file and in here, there is a handler instance)

# Set S3 Permission for Cloudflare with AWS Lambda
 - We are going to set cloudflare IPs to AWS S3 Bucket policy so that only Cloudflare will be able to access S3 Bucket
 - Since IPs of Cloudflare change frequently we need to update S3 bucket policy once a day.
 - Create a lambda function name `lambda_function.py` upload it to a new function, setup environment variable
 - Configure -> permissions -> click on *role name* -> polacies -> create policy -> select *S3* service -> permissions management -> check *PutBucketPolicy*
 - Resources -> add arn -> add bucket name *mdshayon.com* -> set a name `portfolio-put-bucket-policy` for policy -> create policy
 - Back to the role -> attach policy `portfolio-put-bucket-policy`
 - Test lambda code -> check s3 bucket policy -> if it changed successfully then go to browser and check if __mdshayon.com__ is working perfectly or not
 - And make sure [S3 static site url](portfolioBucketPolicyChange-role-5xfgr1g0) is forbidden

# Amazon EventBridge for running lambda everyday
 - Search **EventBridge** -> create rule -> name it anything `portfolio-lambda-policy-change` -> rule type *Schedule*
 - Schedule pattern -> Recurring schedule -> Schedule type *Rate-based schedule* -> Rate expression rate 1 and unit days (it will run once a day)
