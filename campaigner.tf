terraform {
  required_version = "~> 0.14"

  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 3.0"
    }
  }
  backend "s3" {
    bucket = "kaze-terraform"
    key="prod/campaigner.tfstate"
    region = "us-east-1"
  }
}
provider "aws" {
    region = "us-east-1"
}

variable "domain_name" {
    description = "domain name"
    type = "string"
    default = "campaigner.senshikaze.net"
}

variable "common_tags" {
    description = "Common tags to apply to aws"
    default = {
        Project: "campaigner"
    }
}

# s3 bucket
resource "aws_s3_bucket" "www_bucket" {
    bucket = var.domain_name
    acl = "public-read"
    policy = templatefile("templates/s3-policy.json", { bucket = var.domain_name})

    cors_rule {
        allowed_headers = ["Authorization", "Content-Length"]
        allowed_methods = ["GET"]
        allowed_origins = ["https://campaigner.senshikaze.net"]
        max_age_seconds = 3000
    }

    website {
        index_document = "index.html"
    }

    tags = var.common_tags
}

# ssl cert
resource "aws_acm_certificate" "ssl_certificate" {
  domain_name = var.domain_name
  validation_method = "DNS"

  tags = var.common_tags
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "ssl_validation" {
    certificate_arn = aws_acm_certificate.ssl_certificate.arn
}

# cloudfront
resource "aws_cloudfront_distribution" "s3_cloudfront" {
    origin {
        domain_name = aws_s3_bucket.www_bucket.website_endpoint
        origin_id = "S3-${var.domain_name}"

        custom_origin_config {
          http_port = 80
          https_port = 443
          origin_protocol_policy = "http-only"
          origin_ssl_products = ["TLSv1", "TLSv1.3"]
        }
    }
    enabled = true
    is_ipv6_enabled = true
    default_root_object = "index.html"

    default_cache_behavior {
      allowed_methods = ["GET", "HEAD"]
      cached_methods = ["GET", "HEAD"]
      target_origin_id = "S3-campaigner.senshikaze.net"
      viewer_protocol_policy = "redirect-to-https"
      min_ttl = 31536000
      default_ttl = 31536000
      max_ttl = 31536000
      compress = true
    }

    restrictions {
        geo_restriction {
          restriction_type = "none"
        }
    }
    viewer_certificate {
      acm_certificate_arn = aws_acm_certification_validation.ssl_validation.certificate_arn
    }
    tags = var.common_tags
}

# route 53

# api gateway

# lambda

# dynamodb

# cognito
