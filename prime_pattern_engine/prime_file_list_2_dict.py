"""
read in the primes_sieve_n file and convert to dictionary
right output to
prime_file_list_2_dict
"""
import json


def read_primes_sieve_from_file(max_prime, work_dir):
    file_path_name = "{0}primes_sieve_{1}.json".format(work_dir, max_prime)
    with open(file_path_name) as data_file:
        data = json.load(data_file)

    return data


def prime_list_2_dict(prime_list):
    prime_dict = {}
    for i in range(len(prime_list)):
        prime_dict[prime_list[i]] = i
    return prime_dict


def write_sieve_dict_2_file(prime_dict, max_prime, work_dir):
    file_path_name = "{0}primes_sieve_ditc_{1}.json".format(work_dir, max_prime)
    with open(file_path_name, 'w') as outfile:
        json.dump(prime_dict, outfile)


if __name__ == '__main__':
    # configuration parameters
    max_prime = 32000000
    work_dir = 'work_files/'

    prime_list = read_primes_sieve_from_file(max_prime, work_dir)
    prime_dict = prime_list_2_dict(prime_list)
    write_sieve_dict_2_file(prime_dict, max_prime, work_dir)
