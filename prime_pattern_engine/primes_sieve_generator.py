# primes_sieve_generator
# based on ideas from:
# https://jeffknupp.com/blog/2013/04/07/improve-your-python-yield-and-generators-explained/

import math
import json


def is_prime(number, primes_table):
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
        number += 1  # <<<<<<<<<<


def primes_sieve_generator(max_prime):
    # Working on Project Euler #10
    # https://projecteuler.net/problem=10
    prime_count = 1
    primes_table = []
    for next_prime in get_primes(3, primes_table):
        primes_table.append(next_prime)
        prime_count += 1
        if next_prime >= max_prime:
            print('prime count', prime_count)
            print('prime^2 power', int(math.log(next_prime ^ 2, 10)))
            return primes_table


def write_primes_sieve_2_file(sieve, max_prime, work_dir):
    file_path_name = "{0}primes_sieve_{1}.txt".format(work_dir, max_prime)
    with open(file_path_name, 'w') as outfile:
        json.dump(sieve, outfile)


if __name__ == '__main__':
    # configuration parameters
    max_prime = 32000000
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
