# import dependencies
import asyncio
import requests
from bs4 import BeautifulSoup

# URL to scrape from
test_url = 'https://triagecancer.org/congressional-twitter-handles'

def makeRequest(url):
    print('inside makeRequest(url)')
    stuff = requests.get(url)
    return stuff.text

# make request from site
test_html = makeRequest(test_url)

# parse site response
soup = BeautifulSoup(test_html, 'html.parser')
print(test_html)