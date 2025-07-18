# Automation Testing Tool

This project is an automation testing tool that generates manual UI test cases from website screenshots using AI. It automates the process of capturing a webpage screenshot, uploading it to Azure Blob Storage, and leveraging OpenAI's GPT model to generate structured test cases.

## Features

- Capture screenshots of any public webpage using Playwright.
- Upload screenshots to Azure Blob Storage.
- Generate manual UI test cases using OpenAI GPT-4o.
- REST API for easy integration.

## API Endpoints

### POST `/testcase/`

**Description:**  
Generate manual UI test cases from a given webpage URL.

**Request Body:**
```json
{
  "url": "https://example.com"
}

## Response
{
  "data": [
    {
      "title": "Test Case Title",
      "objective": "Test objective description",
      "preconditions": "Any preconditions (optional)",
      "steps": ["Step 1", "Step 2", "..."],
      "expectedResult": "Expected result description"
    }
    // ...more test cases
  ]
}


## 💛 Support

If you find this project useful and want to support my work:  
☕ [Buy Me a Coffee](https://coff.ee/saranjith)

