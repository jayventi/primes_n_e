##primes_n_e##

### Description ###
Generates prime numbers that appear in digits of e in consecutive order and makes them available via a website.

###Back End###
Back and operates by generating a single lookup table which is used by the front end to produce the expected values. The form is prime_n_e_{range}.json. current intentions is to use prime_n_e_12-5.json covering the range of prime numbers up to 12 digits listing the first five occurrences in e.

####Utility Manifest####

First three utilities generate files used by later steps

primes_sieve_generator.py 
basic prime number generator builds  list of  primes to use as sieve to find high value  times up to  the largest value in the list  squared.
generates files with format of primes_sieve_{size}.json

generate_e_one_digit_at_a_time.py
generates  e one digit at a time found code see header for source. generates files of the form e_digit_{size}.txt

prime_file_list_2_dict.py
helper file not strictly necessary converts the  lists of prime numbers founded in primes_sieve_{size}.json into a dictionary  format for fast lookup files generated are a form primes_sieve_ditc_{size}.json

chunkup_seq_e.py
this utility takes the digits of the and segments them into sequences  numbers to be checked for primeality. only these values are checked in the following step  sequenced elements are output to targeted_seqs_e_{size}.json 

n_prime_n_e.py
final utility checks  targeted sequences for primeality uses primes_sieve_{size}.json, primes_sieve_ditc_{size}.json and targeted_seqs_e_{size}.json. this utility produces the final lookup file used by the website. the final output file utilized by  the front and for value lookup is in the form of  prime_n_e_{range}.json

##Lookup table generation procedure##
execute the utilities and the order described the top of each utility's parameters for the number of times to be generated or sequence length to be targeted. 

Operate the website no execution is required to lookup tables already been built source is provided as reference.

###TODO###
Convert utilities into objects or procedures and assemble into one file with a linear execution order. Coalesce all configuration values and one file. 

## Front and ##

Probably a note , angular website without a database the lookup table be loaded as a file at startup. It will be a single page app was two parcels input and output.