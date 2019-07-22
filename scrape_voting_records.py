# import dependencies
import asyncio
import json
import requests
from bs4 import BeautifulSoup

SCRAPE_URL = 'http://www.911healthwatch.org/history/votes/congressional-record/115th-congress/'

API_KEY_KEY = 'X-API-Key'
API_KEY_VAL = '8mGOaDgMZhRxAZZBoyyhTLeID2ZWwj9jDsGuSFPK'
API_CALLS = {
    'v_2010_h_1': 'https://api.propublica.org/congress/v1/111/house/sessions/2/votes/491',
    'v_2010_h_2': 'https://api.propublica.org/congress/v1/111/house/sessions/2/votes/550',
    'v_2010_h_3': 'https://api.propublica.org/congress/v1/111/house/sessions/2/votes/664',
    'v_2010_s_1': 'https://api.propublica.org/congress/v1/111/senate/sessions/2/votes/269',
    'v_2015_b_1': None,
    'v_2019_h_1': 'https://api.propublica.org/congress/v1/116/house/sessions/1/votes/474',
    'v_2019_s_1': None
}
CALLS_TO_USE = ['v_2010_h_1', 'v_2010_h_2', 'v_2010_h_3', 'v_2010_s_1', 'v_2019_h_1']

US_STATE_CODES = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
}


class Congressperson:
    _registry = []
    def __init__(self, name, chamber, party, state, district, v_2010_h_1, v_2010_h_2, v_2010_h_3, v_2010_s_1, v_2015_b_1, v_2019_h_1, v_2019_s_1):
        self._registry.append(self)
        self.name = name
        self.chamber = chamber
        self.party = party
        self.state = state
        self.district = district
        self.voting_history = {
            'v_2010_h_1': v_2010_h_1,
            'v_2010_h_2': v_2010_h_2,
            'v_2010_h_3': v_2010_h_3,
            'v_2010_s_1': v_2010_s_1,
            'v_2015_b_1': v_2015_b_1,
            'v_2019_h_1': v_2019_h_1,
            'v_2019_s_1': v_2019_s_1
        }
        print(self.name)

def codify_vote(vote_text):
    vote_text = vote_text.lower()
    if vote_text == 'nay' or vote_text == 'no' or vote_text == 'not a sponsor' or vote_text == 'not in senate, voted no in house' or vote_text == 'not in senate, but voted no in house':
        return 'N'
    elif vote_text == 'yea' or vote_text == 'yes' or vote_text == 'sponsor' or vote_text == 'not in senate, voted yes in house' or vote_text == 'initially voted no but then agreed to support the bill and vote yes.' or vote_text == 'not in senate, but voted yes in house':
        return 'Y'
    elif vote_text == 'not in congress' or vote_text == 'not in senate':
        return None
    elif vote_text == 'not voting':
        return 'voteless'
    else:
        return 'ERROR'

def strip_state(constit):
    index_of_large = constit.lower().find('at large')
    print(index_of_large)
    if index_of_large == -1:
        print(constit)
        return grab_before_first_char('-', constit)
    else:
        if constit[:3] == 'tah':
            return 'Utah'
        else:
            return constit[:index_of_large]

def makeRequest(url):
    print('inside makeRequest(url)')
    stuff = requests.get(url)
    return stuff.text

def call_API(url):
    stuff = requests.get(url, headers={API_KEY_KEY: API_KEY_VAL})
    return stuff

def grab_after_last_char(char, input_name):
    index = 0
    last_space_index = None
    for character in input_name:
        if character == char:
            last_space_index = index + 1
        index = index + 1
    return input_name[last_space_index:]

def grab_before_first_char(char, input_name):
    index = 0
    last_space_index = None
    for character in input_name:
        if character == char:
            last_space_index = index + 1
        index = index + 1
    return input_name[:last_space_index - 1]

def abbr_state(full_state_name):
    if full_state_name == 'tah':
        return 'UT'
    return US_STATE_CODES[full_state_name]


# test_strip = strip_state('Arizona at Large').strip()
# print(test_strip)
# test_dist = int(grab_after_last_char('-', 'Arizona-03'))
# print(test_dist)
# test_abbr = abbr_state(test_strip)
# print(test_abbr)

html_doc = makeRequest(SCRAPE_URL)
soup = BeautifulSoup(html_doc, 'html.parser')
found_reps = soup.find(id='tablepress-24').find('tbody').find_all('tr')

reps = []

for rep in found_reps:
    name_first = rep.find('td').next_sibling.text.strip()
    # skips iteration if first name blank
    if name_first == '':
        continue

    name_last = rep.find('td').next_sibling.next_sibling.text.strip()
    if name_last == '':
        name_last = 'Gutiérrez'
    name_full = name_first + ' ' + name_last
    constit = rep.find('td').text.strip()
    state = abbr_state(strip_state(constit).strip()).strip()
    if '-' in constit:
        district = int(grab_after_last_char('-', constit))
    else:
        district = 1
    party = rep.find('td').next_sibling.next_sibling.next_sibling.text
    vote_1 = rep.find('td').next_sibling.next_sibling.next_sibling.next_sibling.text
    vote_2 = rep.find('td').next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.text
    vote_3 = rep.find('td').next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.text
    vote_4 = rep.find('td').next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.text

    Congressperson(name_full, 'House', party, state, district, codify_vote(vote_1), codify_vote(vote_2), codify_vote(vote_3), None, codify_vote(vote_4), None, None)


found_senators = soup.find(id='tablepress-25').find('tbody').find_all('tr')

senators = []

for senator in found_senators:
    name_first = senator.find('td').next_sibling.text.strip()
    # skips iteration if first name blank
    if name_first == '':
        continue
    name_first = senator.find('td').next_sibling.text.strip()
    name_last = senator.find('td').next_sibling.next_sibling.text.strip()
    name_full = name_first + ' ' + name_last
    constit = abbr_state(senator.find('td').text.strip())
    party = senator.find('td').next_sibling.next_sibling.next_sibling.text
    vote_1 = senator.find('td').next_sibling.next_sibling.next_sibling.next_sibling.text
    vote_2 = senator.find('td').next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.text

    # (name, chamber, seat, v_2010_h_1, v_2010_h_2, v_2010_h_3, v_2010_s_1, v_2015_b_1, v_2019_h_1, v_2019_s_1)
    Congressperson(name_full, 'Senate', party, constit, 0, None, None, None, codify_vote(vote_1), codify_vote(vote_2), None, None)




response = call_API(API_CALLS['v_2019_h_1'])
resp_data = json.loads(response.text)
# print(resp_data['results']['votes']['vote']['positions'])
chamber = resp_data['results']['votes']['vote']['chamber']
print(chamber)

for person in resp_data['results']['votes']['vote']['positions']:

    # get person's last name
    rec_name_full = person['name']
    rec_name_last = grab_after_last_char(' ', rec_name_full)
    print(rec_name_full, '============', rec_name_last)
    rec_party = person['party']
    print(rec_party)
    rec_state = person['state']
    v_2019_h_1 = codify_vote(person['vote_position'])
    rec_district = 'butts'
    if chamber == 'House':
        rec_district = person['district']
        print(rec_district)
    else:
        rec_district = 0
    # use variable to check if pre-existing record
    prev_record_exists = False

    # check against existing congresspeople of same chamber, state, district
    for existing_cperson in Congressperson._registry:
        cperson_last_name = grab_after_last_char(' ', existing_cperson.name)
        cperson_party = existing_cperson.party
        cperson_state = existing_cperson.state
        if cperson_last_name == rec_name_last and cperson_party == rec_party and cperson_state == rec_state:
            # if same person, add details to record
            prev_record_exists = True
            print('!!!!!!!!!!!!!!!!!! EXISTING RECORD !!!!!!!!!!!!!!!!!')
            print('existing record:', existing_cperson.name)
            print('revising v_2019_h_1:', existing_cperson.voting_history['v_2019_h_1'])
            existing_cperson.voting_history['v_2019_h_1'] = v_2019_h_1
            print(existing_cperson.voting_history['v_2019_h_1'])
    if not prev_record_exists:
        # else, make new record
        # (name, chamber, party, state, district, v_2010_h_1, v_2010_h_2, v_2010_h_3, v_2010_s_1, v_2015_b_1, v_2019_h_1, v_2019_s_1)
        print('//////////////////// NEW RECORD ////////////////////')
        Congressperson(rec_name_full, chamber, rec_party, rec_state, rec_district, None, None, None, None, None, v_2019_h_1, None)

json_writeable = []

for cman in Congressperson._registry:
    if cman.chamber == 'House':
        print(cman.name, cman.chamber, cman.party, cman.state, cman.district)
        json_writeable.append({
            'name': cman.name,
            'chamber': cman.chamber,
            'party': cman.party,
            'state': cman.state,
            'district': cman.district,
            'voting_history': cman.voting_history
        })
    else:
        print(cman.name, cman.chamber, cman.party, cman.state)
        json_writeable.append({
            'name': cman.name,
            'chamber': cman.chamber,
            'party': cman.party,
            'state': cman.state,
            'voting_history': cman.voting_history
        })
    print(cman.voting_history)


with open('voting_data.json', 'w') as fp:
    json.dump(json_writeable, fp)
