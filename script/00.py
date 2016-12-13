#!/usr/bin/python

import urllib2;

if __name__ == '__main__':
    times = 100;
    for i in range(times):
        html = urllib2.urlopen('http://127.0.0.1:3000/logout').read();
        findIdx = html.find('Please');
        print(findIdx);
