"""
generates a sieve list of prime numbers up to a maximum given as a parameter
primes_sieve_generator
based on ideas from:
https://jeffknupp.com/blog/2013/04/07/improve-your-python-yield-and-generators-explained/
"""

import math
import json


def is_prime(number, primes_table):
    """
    determines if a number is prime using primes_table which is updated by
    top level primes_sieve_generator
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


def get_primes(number, primes_table):
    while True:
        if is_prime(number, primes_table):
            yield number
        number += 1  # <<<<<<<<<< yield resumes here


def primes_sieve_generator(max_prime):
    """
    builds and it returns list of prime numbers up to max_prime
    """
    prime_count = 1
    primes_table = []
    for next_prime in get_primes(3, primes_table):
        primes_table.append(next_prime)
        prime_count += 1
        if next_prime >= max_prime:
            print('prime count', prime_count)
            print('prime power', int(math.log(next_prime, 10)))
            return primes_table


def write_primes_sieve_2_file(sieve, max_prime, work_dir):
    file_path_name = "{0}primes_sieve_{1}.json".format(work_dir, max_prime)
    with open(file_path_name, 'w') as outfile:
        json.dump(sieve, outfile)


if __name__ == '__main__':
    # configuration parameters
    max_prime = 1000
    work_dir = 'work_files/'

    sieve = primes_sieve_generator(max_prime)
    write_primes_sieve_2_file(sieve, max_prime, work_dir)


"""
for next_prime < 40000000

('total', 47088408550139L)
('prime count', 2433655)
('prime power', 7)
[Finished in 148.6s]
"""
