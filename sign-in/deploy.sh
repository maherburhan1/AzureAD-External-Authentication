#!/bin/sh
#
mvn clean install

jetty stop

cp ./target/msal4j-servlet-auth.war $JETTY_HOME/libexec/webapps/.

jetty start

