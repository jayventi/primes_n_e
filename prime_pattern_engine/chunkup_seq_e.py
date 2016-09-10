"""
Chunk up sequences of e from a file of e digits
takes two parameters one determines which input file to use
there should be sets of input files of the form 'e_digit_1000.txt'
different power of 10 are available the parameter max_prime 
determines which file is used.
the number of digits that are chunk of five will run from single digit
Sequences up to max_sequence_size.

chunkup_seq_e
Jay Venti
September 8th, 2016
"""

#import string
#import os
import json


def targeted_seqs_e_2_file(targets, max_prime, work_dir):
    file_path_name = "{0}targeted_seqs_e_{1}.json".format(work_dir, max_prime)
    with open(file_path_name, 'w') as outfile:
        json.dump(targets, outfile)


def read_e_digits_file(max_prime, work_dir):
    file_path_name = "{0}e_digit_{1}.txt".format(work_dir, max_prime)
    f = open(file_path_name, 'r')
    e_digits = f.readline()
    return e_digits


work_dir = 'work_files/'
max_prime = 10000
# maximum length of a sequence to generate
max_sequence_size = 12
# filename containing digits of e
#e_digit_file = 'e_digit_1000.txt'
not_prime = ['0', '2', '4', '6', '8', '5']

e_digits = read_e_digits_file(max_prime, work_dir)

# set up a two-dimensional array first dimension is the  sequence [1,max_sequence_size]
# the second parameter is the number of found prime targets in  the e digit sequence
# second parameter is expected to be around .4  of the number of digits by excluding
# evens and digits and the digit 5. this will be a output file  and constitutes the
# target for testing for prime-ness
y = int(max_prime * .5)
targets = [[[-1, -1] for i in range(y)] for j in range(1, max_sequence_size+2)]

position = 0
target_count = 0

while (position < len(e_digits)):
    num_e_digit = e_digits[position]
    if (num_e_digit not in not_prime):
        target_count += 1
        # print 'num_e_digit', num_e_digit
        for seq_len in range(1, max_sequence_size+1):
            try:
                seq_num = int(e_digits[position - seq_len + 1:position+1])
                # print 'seq_num', e_digits[position - seq_len + 1:position+1]
            except:
                seq_num = -2
            # print'seq_len', seq_len, 'count', target_count, 'seq_num', seq_num, \
            #     'position',position
            targets[seq_len][target_count] = [seq_num, position + 1]
    position += 1


targeted_seqs_e_2_file(targets, max_prime, work_dir)


##################################################
# quickie unit test for json on consistency on targets d2 array

file_path_name = "{0}targeted_seqs_e_{1}.json".format(work_dir, max_prime)
with open(file_path_name) as json_data:
    targeted = json.load(json_data)

# does reconstituted matched original
print ('Does reconstituted json matched original', targeted == targets)

# inspect some of the first entries in table targeted
# for seq_len in range(1, max_sequence_size+1):
#     for count in range(1, 100):
#         print 'seq_len', seq_len, 'count', count, \
#             '=> seq_num', targeted[seq_len][count][0], 'position', targeted[seq_len][count][1]
