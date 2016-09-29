# generate_e_one_digit_at_a_time
# from: Code to Generate e one Digit at a Time
# found at: http://stackoverflow.com/questions/9144154/code-to-generate-e-one-digit-at-a-time
# see: Generating digits of square root of 2
# at: http://stackoverflow.com/questions/5187664/generating-digits-of-square-root-of-2
#
# brief description of continuous fraction method
# any fraction may be given as a continuous fraction representation finite continuous fraction elements
# irrational numbers such as e can be given with infinite sequences of continuous fraction terms
# e is given by a repetitive pattern of continuous fraction terms [1;0,1,1,2,1,1,4...] 
# for a tutorial on continuous fractions see 

def z(contfrac, a=1, b=0, c=0, d=1):
    for x in contfrac:
        # x will be the  continued fraction as input
        while a > 0 and b > 0 and c > 0 and d > 0:
            t = a // c
            t2 = b // d
            if not t == t2:
                break
            #print t
            yield t
            a = (10 * (a - c*t))
            b = (10 * (b - d*t))
            # continue with same fraction, don't pull new x
        a, b = x*a+b, a
        c, d = x*c+d, c
    


def e_cf_expansion():
    #  continued fraction for e []
    #  see Representations in en.wikipedia.org/wiki/E_(mathematical_constant)
    yield 1
    k = 0
    while True:
        yield k
        k += 2
        yield 1
        yield 1


def e_dec():
    return z(e_cf_expansion())


if __name__ == '__main__':
    # configuration parameters
    digit_count = 1200
    work_dir = 'work_files/'

    gen = e_dec()
    e = [str(gen.next()) for i in xrange(digit_count)]

    e_str = ''.join(e)
    print e_str
    # with open("{0}e_digit_{1}.txt".format(work_dir, digit_count), "w") as text_file:
    #     text_file.write(e_str)
