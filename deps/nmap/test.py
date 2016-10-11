import nmap
nm = nmap.PortScanner()
nm.scan('localhost', arguments= '-S 127.0.0.1')
for host in nm.all_hosts():
    print('Host : %s (%s)' % (host, nm[host].hostname()))

