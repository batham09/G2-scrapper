const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const readline = require('readline');


async function fetchReviews(companyName, startDate, endDate) {
  try {

    const apiUrl = `https://api.crawlbase.com/?token=sA2s6vxzqXyMqcer-jjL5g&url=https://www.g2.com/products/${companyName}/reviews%23reviews`;
    const response = await fetch(apiUrl);

    console.log(response, "API Reponse");
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const html = await response.text();

    
 
    const $ = cheerio.load(html);
    // console.log($, "html file")

    if (!$('#reviews').length) {
        console.error('Error: #reviews element not found in the HTML.');
        return [];
      }
  
      console.log('Found #reviews element:');
  
  
      const nestedContainer = $('#reviews .nested-ajax-loading .paper');
      if (!nestedContainer.length) {
        console.error('Error: .nested-ajax-loading element not found within #reviews.');
        return [];
      }
   
      console.log('Found .nested-ajax-loading element:');

  
      
      const reviews = [];
      nestedContainer.each((i, el) => {
        const username = $(el).find('.flex.ai-c').text().trim();
        const dateText = $(el).find('.x-current-review-date').text().trim();
        const reviewText = $(el).find('.formatted-text').text().trim();
  
        if (dateText && reviewText) {
     
          const reviewDate = new Date(dateText);
          const start = new Date(startDate);
          const end = new Date(endDate);

  

          if (reviewDate >= start && reviewDate <= end) {
            reviews.push({
                username: username,
              date: dateText,
              review: reviewText,
            });
          }
        } else {
          console.warn('Warning: Missing date or review text for element:', $(el).html());
        }
      });

    return reviews;


  } catch (error) {
    console.error('Error fetching reviews:', error.message);
  }
}


(async () => {
//   const companyName = 'Yellow.ai'; // Company name to filter by

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the company name: ", async (companyName) => {
  rl.question("Enter the start date (YYYY-MM-DD): ", async (startDate) => {
      rl.question("Enter the end date (YYYY-MM-DD): ", async(endDate) => {
         
              try {
                  const formattedCompanyName = companyName.toLowerCase().replace(/ /g, '-');
                  const reviews = await fetchReviews(formattedCompanyName, startDate, endDate);
                  if (reviews && reviews.length > 0) {
                    const outputFilePath = './filteredReviews.json';
                    fs.writeFileSync(outputFilePath, JSON.stringify(reviews, null, 2));
                    console.log(`Filtered reviews saved to ${outputFilePath}`);
                  } else {
                    console.log('No reviews found or fetched.');
                  }
              } catch (error) {
                  console.error(`Error: ${error.message}`);
              } finally {
                  rl.close();
              }
          
      });
  });
});





})();

