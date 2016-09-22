"""
Test if e_digit_10000.txt same as HistTopics-e_10000.txt.

test_my_same_as_histtopics.py
Jay Venti
September 9th, 2016
"""


f = open('e_digit_10000.txt', 'r')
my_e_10000 = f.readline()

f = open('HistTopics-e_10000.txt', 'r')
ht_e_10000 = f.readline()

print 'len(my_e_10000)', len(my_e_10000),'len(ht_e_10000)', len(ht_e_10000)

same = True
for position in range(len(my_e_10000)-1):
	my_digit_e = my_e_10000[position]
	ht_digit_e = ht_e_10000[position]
	if (my_digit_e != ht_digit_e):
		print 'position', position,'my_digit_e', my_digit_e, 'ht_digit_e', ht_digit_e
		same = False
print 	'same? ', same 