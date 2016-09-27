##primes_n_e##

### Description ###
Generates prime numbers that appear in digits of e in consecutive order and makes them available via a website.

###Back End###
Backend operates by generating a single lookup table which is used by the frontend to produce the expected values. The form is prime_n_e_{range}.json. Current intentions is to use prime_n_e_12-5.json covering the range of prime numbers up to 12 digits listing the first five occurrences in e.

####Utility Manifest####

First three utilities generate files used by later steps

primes_sieve_generator.py 
Basic prime number generator builds list of primes to use as sieve to find high value  primes up to the largest value in the list squared.
Generates files with format of primes_sieve_{size}.json

generate_e_one_digit_at_a_time.py
Generates e one digit at a time, found code see header for source. Generates files of the form e_digit_{size}.txt

prime_file_list_2_dict.py
Helper file not strictly necessary converts the lists of prime numbers founded in primes_sieve_{size}.json into a dictionary format for fast lookup. Files generated are in a form primes_sieve_ditc_{size}.json

chunkup_seq_e.py
This utility takes the digits of the and segments them into sequences numbers to be checked for primeality. Only these values are checked in the following step sequenced elements are output to targeted_seqs_e_{size}.json 

n_prime_n_e.py
Final utility checks targeted sequences for primeality uses primes_sieve_{size}.json, primes_sieve_ditc_{size}.json and targeted_seqs_e_{size}.json. This utility produces the final lookup file used by the website. The output file is in the form of prime_n_e_{range}.json

##Lookup Table Generation Procedure##
Execute the utilities in the order described, each utility's contains parameters relevant to each step. 

To run the website no backend code is required the desired primes are stored in a json file using key of the form 'Y-X' where Y is desired prime's length and X is the desired occurrence in e. Currently the system uses prime_n_e_12-5.json which contains all the first five prime of each lengths up to 12.

## Nodejs Site Installation##

<p>Backend components are not necessary, a prepared data file, prime_n_e_12-5.json, is provided in the /nodejs_frontend/server/datafiles/ directory.</p>

1) Install Nodejs, versions 4.1.0, 4.20 and 4.4.7 are known to work

2) Install files, clone https://github.com/jayventi/primes_n_e.git repository, however only the /nodejs_frontend directory is required.

3) Install nodejs packages, in the nodejs_frontend directory execute
 npm install. A package.json file is provided.

4) primes_n_e is now ready to run use node server.js

###TODO###
Convert utilities into objects or procedures and assemble into one file with a linear execution order. Coalesce all configuration values into one file. 

## Frontend ##

The site consists of a nodejs sIerver, express, and angular, the data is read in and parsed once. The site is delivered as a one-page application with two partials one for inputting single values and a second, work yet to be completed, for uploading csv files of sets of values to be checked.