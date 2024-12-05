@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem
@rem SPDX-License-Identifier: Apache-2.0
@rem

@if "%DEBUG%"=="" @echo off
@rem ##########################################################################
@rem
@rem  DemoMapReduce startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
@rem This is normally unused
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and DEMO_MAP_REDUCE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME% 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\DemoMapReduce-0.0.1-SNAPSHOT.jar;%APP_HOME%\lib\hadoop-client-3.4.1.jar;%APP_HOME%\lib\hbase-mapreduce-2.6.1.jar;%APP_HOME%\lib\hbase-server-2.6.1.jar;%APP_HOME%\lib\hbase-replication-2.6.1.jar;%APP_HOME%\lib\hbase-zookeeper-2.6.1.jar;%APP_HOME%\lib\hbase-asyncfs-2.6.1.jar;%APP_HOME%\lib\hbase-client-2.6.1.jar;%APP_HOME%\lib\hbase-hadoop2-compat-2.6.1.jar;%APP_HOME%\lib\hbase-metrics-2.6.1.jar;%APP_HOME%\lib\hbase-http-2.6.1.jar;%APP_HOME%\lib\hbase-hadoop-compat-2.6.1.jar;%APP_HOME%\lib\hbase-procedure-2.6.1.jar;%APP_HOME%\lib\hbase-metrics-api-2.6.1.jar;%APP_HOME%\lib\hbase-common-2.6.1.jar;%APP_HOME%\lib\hadoop-common-3.4.1.jar;%APP_HOME%\lib\hadoop-mapreduce-client-jobclient-3.4.1.jar;%APP_HOME%\lib\hadoop-mapreduce-client-common-3.4.1.jar;%APP_HOME%\lib\hadoop-mapreduce-client-core-3.4.1.jar;%APP_HOME%\lib\hbase-protocol-2.6.1.jar;%APP_HOME%\lib\log4j-core-2.24.2.jar;%APP_HOME%\lib\log4j-api-2.24.2.jar;%APP_HOME%\lib\hadoop-yarn-client-3.4.1.jar;%APP_HOME%\lib\hadoop-yarn-common-3.4.1.jar;%APP_HOME%\lib\hadoop-yarn-api-3.4.1.jar;%APP_HOME%\lib\hadoop-shaded-protobuf_3_25-1.3.0.jar;%APP_HOME%\lib\hadoop-annotations-3.4.1.jar;%APP_HOME%\lib\hadoop-auth-3.4.1.jar;%APP_HOME%\lib\hadoop-shaded-guava-1.3.0.jar;%APP_HOME%\lib\jersey-guice-1.19.4.jar;%APP_HOME%\lib\guice-servlet-4.2.3.jar;%APP_HOME%\lib\guice-4.2.3.jar;%APP_HOME%\lib\guava-27.1-jre.jar;%APP_HOME%\lib\hadoop-hdfs-2.10.2.jar;%APP_HOME%\lib\commons-cli-1.5.0.jar;%APP_HOME%\lib\commons-math3-3.6.1.jar;%APP_HOME%\lib\hadoop-hdfs-client-3.4.1.jar;%APP_HOME%\lib\httpclient-4.5.13.jar;%APP_HOME%\lib\avro-1.9.2.jar;%APP_HOME%\lib\commons-compress-1.26.1.jar;%APP_HOME%\lib\commons-codec-1.16.1.jar;%APP_HOME%\lib\zookeeper-3.8.4.jar;%APP_HOME%\lib\commons-io-2.16.1.jar;%APP_HOME%\lib\commons-net-3.9.0.jar;%APP_HOME%\lib\commons-beanutils-1.9.4.jar;%APP_HOME%\lib\commons-collections-3.2.2.jar;%APP_HOME%\lib\jetty-webapp-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-servlet-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-security-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-server-9.4.53.v20231009.jar;%APP_HOME%\lib\hbase-shaded-jetty-4.1.9.jar;%APP_HOME%\lib\javax.servlet-api-3.1.0.jar;%APP_HOME%\lib\jackson-jaxrs-json-provider-2.12.7.jar;%APP_HOME%\lib\jackson-jaxrs-base-2.12.7.jar;%APP_HOME%\lib\jackson-databind-2.12.7.1.jar;%APP_HOME%\lib\jackson-core-2.12.7.jar;%APP_HOME%\lib\jackson-annotations-2.12.7.jar;%APP_HOME%\lib\jackson-module-jaxb-annotations-2.12.7.jar;%APP_HOME%\lib\jakarta.xml.bind-api-2.3.2.jar;%APP_HOME%\lib\jakarta.activation-api-1.2.1.jar;%APP_HOME%\lib\websocket-client-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-client-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-http-9.4.53.v20231009.jar;%APP_HOME%\lib\websocket-common-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-io-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-util-ajax-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-xml-9.4.53.v20231009.jar;%APP_HOME%\lib\jetty-util-9.4.53.v20231009.jar;%APP_HOME%\lib\jsp-api-2.1.jar;%APP_HOME%\lib\jersey-json-1.22.0.jar;%APP_HOME%\lib\jersey-servlet-1.19.4.jar;%APP_HOME%\lib\jersey-server-1.19.4.jar;%APP_HOME%\lib\jersey-client-1.19.4.jar;%APP_HOME%\lib\jersey-core-1.19.4.jar;%APP_HOME%\lib\jettison-1.5.4.jar;%APP_HOME%\lib\slf4j-reload4j-1.7.36.jar;%APP_HOME%\lib\reload4j-1.2.22.jar;%APP_HOME%\lib\commons-configuration2-2.10.1.jar;%APP_HOME%\lib\commons-text-1.11.0.jar;%APP_HOME%\lib\commons-lang3-3.14.0.jar;%APP_HOME%\lib\dnsjava-3.6.1.jar;%APP_HOME%\lib\metrics-core-3.2.6.jar;%APP_HOME%\lib\kerb-util-2.0.3.jar;%APP_HOME%\lib\kerb-crypto-2.0.3.jar;%APP_HOME%\lib\kerb-core-2.0.3.jar;%APP_HOME%\lib\kerby-pkix-2.0.3.jar;%APP_HOME%\lib\hbase-logging-2.6.1.jar;%APP_HOME%\lib\hbase-unsafe-4.1.9.jar;%APP_HOME%\lib\kerby-config-2.0.3.jar;%APP_HOME%\lib\slf4j-api-1.7.36.jar;%APP_HOME%\lib\re2j-1.1.jar;%APP_HOME%\lib\gson-2.9.0.jar;%APP_HOME%\lib\jsch-0.1.55.jar;%APP_HOME%\lib\curator-recipes-5.2.0.jar;%APP_HOME%\lib\curator-framework-5.2.0.jar;%APP_HOME%\lib\curator-client-5.2.0.jar;%APP_HOME%\lib\jsr305-3.0.2.jar;%APP_HOME%\lib\netty-all-4.1.100.Final.jar;%APP_HOME%\lib\netty-resolver-dns-native-macos-4.1.100.Final-osx-x86_64.jar;%APP_HOME%\lib\netty-resolver-dns-native-macos-4.1.100.Final-osx-aarch_64.jar;%APP_HOME%\lib\netty-resolver-dns-classes-macos-4.1.100.Final.jar;%APP_HOME%\lib\netty-resolver-dns-4.1.100.Final.jar;%APP_HOME%\lib\netty-handler-4.1.105.Final.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.105.Final.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.105.Final-linux-x86_64.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.105.Final-linux-aarch_64.jar;%APP_HOME%\lib\bcprov-jdk18on-1.78.1.jar;%APP_HOME%\lib\woodstox-core-5.4.0.jar;%APP_HOME%\lib\stax2-api-4.2.1.jar;%APP_HOME%\lib\snappy-java-1.1.10.4.jar;%APP_HOME%\lib\hbase-shaded-miscellaneous-4.1.9.jar;%APP_HOME%\lib\hbase-shaded-netty-4.1.9.jar;%APP_HOME%\lib\hbase-protocol-shaded-2.6.1.jar;%APP_HOME%\lib\hbase-shaded-protobuf-4.1.9.jar;%APP_HOME%\lib\protobuf-java-2.5.0.jar;%APP_HOME%\lib\opentelemetry-semconv-1.15.0-alpha.jar;%APP_HOME%\lib\opentelemetry-api-1.15.0.jar;%APP_HOME%\lib\zookeeper-jute-3.8.4.jar;%APP_HOME%\lib\audience-annotations-0.13.0.jar;%APP_HOME%\lib\failureaccess-1.0.1.jar;%APP_HOME%\lib\listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar;%APP_HOME%\lib\caffeine-2.8.1.jar;%APP_HOME%\lib\checker-qual-3.1.0.jar;%APP_HOME%\lib\j2objc-annotations-1.1.jar;%APP_HOME%\lib\animal-sniffer-annotations-1.17.jar;%APP_HOME%\lib\httpcore-4.4.13.jar;%APP_HOME%\lib\commons-logging-1.3.0.jar;%APP_HOME%\lib\jsr311-api-1.1.1.jar;%APP_HOME%\lib\jaxb-impl-2.2.3-1.jar;%APP_HOME%\lib\nimbus-jose-jwt-9.37.2.jar;%APP_HOME%\lib\jaxb-api-2.2.11.jar;%APP_HOME%\lib\jline-3.9.0.jar;%APP_HOME%\lib\netty-transport-native-kqueue-4.1.100.Final-osx-x86_64.jar;%APP_HOME%\lib\netty-transport-native-kqueue-4.1.100.Final-osx-aarch_64.jar;%APP_HOME%\lib\netty-transport-classes-epoll-4.1.105.Final.jar;%APP_HOME%\lib\netty-transport-classes-kqueue-4.1.100.Final.jar;%APP_HOME%\lib\netty-transport-native-unix-common-4.1.105.Final.jar;%APP_HOME%\lib\netty-codec-dns-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-4.1.105.Final.jar;%APP_HOME%\lib\netty-transport-4.1.105.Final.jar;%APP_HOME%\lib\netty-buffer-4.1.105.Final.jar;%APP_HOME%\lib\netty-codec-haproxy-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-http-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-http2-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-memcache-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-mqtt-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-redis-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-smtp-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-socks-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-stomp-4.1.100.Final.jar;%APP_HOME%\lib\netty-codec-xml-4.1.100.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.105.Final.jar;%APP_HOME%\lib\netty-common-4.1.105.Final.jar;%APP_HOME%\lib\netty-handler-proxy-4.1.100.Final.jar;%APP_HOME%\lib\netty-handler-ssl-ocsp-4.1.100.Final.jar;%APP_HOME%\lib\netty-transport-rxtx-4.1.100.Final.jar;%APP_HOME%\lib\netty-transport-sctp-4.1.100.Final.jar;%APP_HOME%\lib\netty-transport-udt-4.1.100.Final.jar;%APP_HOME%\lib\hbase-shaded-gson-4.1.9.jar;%APP_HOME%\lib\commons-crypto-1.1.0.jar;%APP_HOME%\lib\joni-2.2.1.jar;%APP_HOME%\lib\jcodings-1.0.58.jar;%APP_HOME%\lib\javax.servlet.jsp-2.3.2.jar;%APP_HOME%\lib\javax.servlet.jsp-api-2.3.1.jar;%APP_HOME%\lib\agrona-1.12.0.jar;%APP_HOME%\lib\jamon-runtime-2.4.1.jar;%APP_HOME%\lib\disruptor-3.4.4.jar;%APP_HOME%\lib\hadoop-distcp-2.10.2.jar;%APP_HOME%\lib\error_prone_annotations-2.32.0.jar;%APP_HOME%\lib\opentelemetry-context-1.15.0.jar;%APP_HOME%\lib\javax.activation-api-1.2.0.jar;%APP_HOME%\lib\jetty-6.1.26.jar;%APP_HOME%\lib\jetty-util-6.1.26.jar;%APP_HOME%\lib\commons-lang-2.6.jar;%APP_HOME%\lib\commons-daemon-1.0.13.jar;%APP_HOME%\lib\xmlenc-0.52.jar;%APP_HOME%\lib\netty-3.10.6.Final.jar;%APP_HOME%\lib\htrace-core4-4.1.0-incubating.jar;%APP_HOME%\lib\leveldbjni-all-1.8.jar;%APP_HOME%\lib\jcip-annotations-1.0-1.jar;%APP_HOME%\lib\kerby-asn1-2.0.3.jar;%APP_HOME%\lib\kerby-util-2.0.3.jar;%APP_HOME%\lib\javax.inject-1.jar;%APP_HOME%\lib\aopalliance-1.0.jar;%APP_HOME%\lib\hbase-shaded-jersey-4.1.9.jar;%APP_HOME%\lib\javax.el-3.0.1-b12.jar;%APP_HOME%\lib\websocket-api-9.4.53.v20231009.jar;%APP_HOME%\lib\jakarta.annotation-api-1.3.5.jar;%APP_HOME%\lib\jakarta.validation-api-2.0.2.jar;%APP_HOME%\lib\jakarta.inject-2.6.1.jar;%APP_HOME%\lib\javassist-3.30.2-GA.jar


@rem Execute DemoMapReduce
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %DEMO_MAP_REDUCE_OPTS%  -classpath "%CLASSPATH%" mapReduce.MapReducerApplication %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable DEMO_MAP_REDUCE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%DEMO_MAP_REDUCE_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
