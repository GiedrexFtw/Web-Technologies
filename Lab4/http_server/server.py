"""An example of a simple HTTP server."""
import mimetypes
import socket
import html
import sys
import json
import os

# Port number
PORT = 8080

# Header template for a successful HTTP request
# Return this header (+ content) when the request can be
# successfully fulfilled
HEADER_RESPONSE_200 = """HTTP/1.1 200 OK\r
Content-Type: %s\r
Content-Length: %d\r
Connection: Close\r
\r
"""

# Template for a 404 (Not found) error: return this when
# the requested resource is not found
RESPONSE_404 = """HTTP/1.1 404 Not found\r
Content-Type: text/html; charset=utf-8\r
Connection: Close\r
\r
<!DOCTYPE html>
<h1>404 Page not found</h1>
<p>Page cannot be found.</p>
"""


def process_request(connection, address, port):
    """
    Process an incoming socket request.

    :param connection: the socket object used to send and receive data
    :param address: the address (IP) of the remote socket
    :param port: the port number of the remote socket
    """
    # Make reading from a socket like reading/writing from a file
    # Use binary mode, so we can read and write binary data. However,
    # this also means that we have to decode (and encode) data (preferably
    # to utf-8) when reading (and writing) text
    client = connection.makefile("wrb")
    #Reading first line and adding to the list
    line=client.readline().decode("utf-8").strip()
    request=[]
    request.append(line)
    #Reading all request lines and adding them all to list
    while line:
        line=client.readline().decode("utf-8").strip()
        request.append(line)
    print(request)
    #checks if request is not empty(sometimes it randomly connected with empty request)
    if (request==['']):
        client.close()
        print("empty")
        return
    header=request[0].split()
    #Check the header what path it provides and if request type is GET
    if(header[0] == "GET" and os.path.isfile("."+header[1])
     and not header[1].endswith(".py")):    #not allowing user to access python script files
        #Reads the requested file and returns 200 response code and content
        f=open("."+header[1], "r", encoding="cp437")    #Got error before that couldnt read symbol from file(even with UTF8 encoding), now ok
        contents=f.read()
        full_response=HEADER_RESPONSE_200+contents
        client.write(full_response.encode("utf-8"))
    else: 
        #Wrong request type or resource not found
        client.write(RESPONSE_404.encode("utf-8"))
    # Closes file-like object
    client.close()

def main():
    """Starts the server and waits for connections."""
    # Create a TCP socket
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # To prevent "Address already in use" error while restarting the server,
    # set the reuse address socket option
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    # Bind on all network addresses (interfaces)
    server.bind(("", PORT))
    # Start listening and allow at most 1 queued connection
    server.listen(1)
    print("Listening on %d" % PORT)
    while True:
        # Accept the connection
        connection, (address, port) = server.accept()
        print("[%s:%d] CONNECTED" % (address, port))

        # Process request and provide response
        process_request(connection, address, port)
        # Close the socket
        connection.close()
        print("[%s:%d] DISCONNECTED" % (address, port))


if __name__ == "__main__":
    main()
