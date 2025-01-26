# Review Scraper for G2.com

This project is a simple Node.js script that fetches reviews for a specific product from the G2 website. It filters reviews based on a provided date range and saves the filtered results into a JSON file.

Requirements
Before running the script, ensure you have the following installed:

Node.js (version 14 or later)
npm (Node Package Manager)
You will also need to install the required dependencies:

fs: File system module (included with Node.js)
node-fetch: To make API requests
cheerio: To parse and traverse the HTML
puppeteer: For headless browser automation (although not directly used here, it is included for any potential future scraping).

## To install the dependencies, run:
```javascript  npm install cheerio
 npm install puppeteer
 ```

## Configuration
The script uses a crawl API (Crawlbase) for fetching HTML content from the G2 reviews page. Replace the token in the URL with your valid API key:

```javascript 
const apiUrl = 'https://api.crawlbase.com/?token=YOUR_API_KEY&url=https://www.g2.com/products/${companyName}/reviews%23reviews'; 
```

## Usage
Clone this repository or download the script file.

Set your desired startDate and endDate in the script:

```javascript 
const startDate = '2020-01-01';
const endDate = '2025-01-30';
```

## What the script does:
Fetches Reviews: The script makes an API call to Crawlbase to fetch the reviews of a specific product (Akamai) from the G2 website.

Filters Reviews by Date: The reviews are filtered by the provided startDate and endDate.

Extracts Review Data: It extracts the username, date, and review text from each review.

Saves to JSON: The filtered reviews are saved into a JSON file named filteredReviews.json in the current directory.

## Example Output
The resulting JSON file will look like this:

``` javascript
[
  {
    "username": "Verified User in Marketing and AdvertisingInformation",
    "date": "Jan 09, 2025",
    "review": "The ease of the Akamai intergration is amazing. I use it frequently throughout the day. Review collected by and hosted on G2.com.I have not found anything that i dislike. Review collected by and hosted on G2.com.Making my updates show up as soon as i send a request. Review collected by and hosted on G2.com."
  },
  {
    "username": "Verified User in Information Technology and ServicesInformation",
    "date": "Jul 10, 2023",
    "review": "In terms of security solutions, Akamai provides many different security solutions depending on the requirement. The highlights here are that all their solutions can work as one meaning all data are consolidated and correlated afterward, giving you the best data for visibility. Review collected by and hosted on G2.com.Akamai is known for acquiring other vendor to add it to their current solutions. The drawback here is that so many added solutions within a short time make it harder to learn and gain expertise on it. Review collected by and hosted on G2.com.Akamai helps protect to secure web traffic within a given environment. It can be through HTTP/HTTPS layer, DNS layer protection and any other protocol residing on Layer 7 of OSI Layer. As a distributor, it helps us to position this product easily because of its offerings. As a user, I can easily manage all these solutions because of a central management system or single pane of glass management available out of the box. Review collected by and hosted on G2.com."
  }
]

```

## Troubleshooting
Error: #reviews element not found: This indicates that the expected HTML element containing reviews is missing or the page structure has changed. Check if the URL has changed or if the page structure is different.

API issues: If the Crawlbase API is not working or the token is invalid, make sure you have a valid API token.