"""
Test target sequences to determine if they are prime build lookup table
Using pre-created target sequences in e determine which sequences are prime
numbers in consecutive order in which they appear. Build a array
of these prime numbers that appearens in order.
Only hunt for the first n prime, given by n_primes, of a given length up
to the maximum sequence length, given by max_sequence_size.

n_prime_n_e
Jay Venti
September 9th, 2016
"""

import json
import math

def prime_n_e_2_file(prime_n_e, work_dir, max_sequence_size, n_primes):
    file_path_name = "{0}prime_n_e_{1}-{2}.json".format(work_dir, max_sequence_size, n_primes)
    with open(file_path_name, 'w') as outfile:
        json.dump(prime_n_e, outfile)


def lode_json_file(file_path_name):
    with open(file_path_name) as json_data:
        data_lode = json.load(json_data)
    return data_lode


def isprime_lookup(prim_2_test, primes_dict):
    if str(prim_2_test) in primes_dict:
        return True
    else:
        return False


def is_prime(number, primes_table):
    """
    determines if a number is prime using primes_table
    """
    if number > 1:
        if number == 2:
            return True
        if number % 2 == 0:
            return False
        max_test = int(math.sqrt(number) + 1)
        for current in primes_table:
            if current > max_test:
                return True
            if number % current == 0:
                return False
        return True
    return False


work_dir = 'work_files/'
max_prime_fname = 10000
n_primes = 20
# maximum length of a sequence to generate
max_sequence_size = 12
prime_sieve_size = 32000000
# filename containing digits of e

# json file of e sequences to search through for primes
file_path_name = "{0}targeted_seqs_e_{1}.json".format(work_dir, max_prime_fname)
e_targeted = lode_json_file(file_path_name)

# json list of prime numbers up to prime_sieve_size
file_path_name = "{0}primes_sieve_{1}.json".format(work_dir, prime_sieve_size)
primes_table = lode_json_file(file_path_name)
#print primes_table

# json dictionary of prime for look up, up to prime_sieve_size
file_path_name = "{0}primes_sieve_ditc_{1}.json".format(work_dir, prime_sieve_size)
primes_dict = lode_json_file(file_path_name)


"""
Prime_n_e might more economically be stored as 2d array,
however since it is small and is going to be flushed to json
and read by a different language, to minimize  translation confusion
it is cast a dictionary is the least ambiguous  json form for conversion.
This form is also handy for use in a webpage using JavaScript.
"""
prime_n_e = {}  # of form {key: {seq: , pos:} } key for form 'n-len'

# find fist n_primes seqs in e_targeted for each sequence_size
target_size = len(e_targeted[1])

for seq_len in range(1, max_sequence_size+1):
    #print 'seq_len', seq_len
    n_found = 0
    i = 0
    while (n_found < n_primes and i <= target_size):
        i += 1
        prim_2_test = e_targeted[seq_len][i][0]
        if (prim_2_test > 0):
            if (prim_2_test <= prime_sieve_size):
                isprime = isprime_lookup(prim_2_test, primes_dict)
            else:
                isprime = is_prime(prim_2_test, primes_table)
            if (isprime):
                #TODO cheek for destint seqs 1,1 !!!  '' vs ""
                n_found += 1
                key = "{0}-{1}".format(seq_len, n_found)
                prime_n_e[key] = {"seq": prim_2_test, "pos": e_targeted[seq_len][i][1]}
                print 'found at {0}-{1}'.format(seq_len, n_found),'prime', \
                    prim_2_test,'position', e_targeted[seq_len][i][1]


prime_n_e_2_file(prime_n_e, work_dir, max_sequence_size, n_primes)
