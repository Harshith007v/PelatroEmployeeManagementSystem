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

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\DemoMapReduce-0.0.1-SNAPSHOT.jar;%APP_HOME%\lib\hadoop-client-3.1.1.jar;%APP_HOME%\lib\hbase-mapreduce-2.2.3.jar;%APP_HOME%\lib\hbase-server-2.2.3.jar;%APP_HOME%\lib\hbase-replication-2.2.3.jar;%APP_HOME%\lib\hbase-zookeeper-2.2.3.jar;%APP_HOME%\lib\hbase-client-2.2.3.jar;%APP_HOME%\lib\hbase-hadoop2-compat-2.2.3.jar;%APP_HOME%\lib\hbase-metrics-2.2.3.jar;%APP_HOME%\lib\hbase-hadoop-compat-2.2.3.jar;%APP_HOME%\lib\hbase-procedure-2.2.3.jar;%APP_HOME%\lib\hbase-metrics-api-2.2.3.jar;%APP_HOME%\lib\hbase-http-2.2.3.jar;%APP_HOME%\lib\hbase-common-2.2.3.jar;%APP_HOME%\lib\hadoop-common-3.1.1.jar;%APP_HOME%\lib\hadoop-mapreduce-client-jobclient-3.1.1.jar;%APP_HOME%\lib\hadoop-mapreduce-client-common-3.1.1.jar;%APP_HOME%\lib\hadoop-mapreduce-client-core-3.1.1.jar;%APP_HOME%\lib\hbase-protocol-2.2.3.jar;%APP_HOME%\lib\log4j-core-2.24.2.jar;%APP_HOME%\lib\log4j-api-2.24.2.jar;%APP_HOME%\lib\hadoop-yarn-client-3.1.1.jar;%APP_HOME%\lib\hadoop-yarn-common-3.1.1.jar;%APP_HOME%\lib\hadoop-yarn-api-3.1.1.jar;%APP_HOME%\lib\hadoop-annotations-3.1.1.jar;%APP_HOME%\lib\hadoop-auth-3.1.1.jar;%APP_HOME%\lib\curator-recipes-2.12.0.jar;%APP_HOME%\lib\curator-framework-2.12.0.jar;%APP_HOME%\lib\curator-client-2.12.0.jar;%APP_HOME%\lib\hadoop-hdfs-2.8.5.jar;%APP_HOME%\lib\jersey-guice-1.19.jar;%APP_HOME%\lib\guice-servlet-4.0.jar;%APP_HOME%\lib\guice-4.0.jar;%APP_HOME%\lib\guava-16.0.1.jar;%APP_HOME%\lib\commons-cli-1.2.jar;%APP_HOME%\lib\commons-math3-3.6.1.jar;%APP_HOME%\lib\httpclient-4.5.2.jar;%APP_HOME%\lib\commons-codec-1.11.jar;%APP_HOME%\lib\kerb-simplekdc-1.0.1.jar;%APP_HOME%\lib\kerb-client-1.0.1.jar;%APP_HOME%\lib\kerb-admin-1.0.1.jar;%APP_HOME%\lib\kerb-server-1.0.1.jar;%APP_HOME%\lib\kerb-common-1.0.1.jar;%APP_HOME%\lib\commons-io-2.5.jar;%APP_HOME%\lib\commons-net-3.6.jar;%APP_HOME%\lib\commons-beanutils-1.9.3.jar;%APP_HOME%\lib\commons-collections-3.2.2.jar;%APP_HOME%\lib\jetty-webapp-9.3.27.v20190418.jar;%APP_HOME%\lib\jetty-servlet-9.3.27.v20190418.jar;%APP_HOME%\lib\jetty-security-9.3.27.v20190418.jar;%APP_HOME%\lib\jetty-server-9.3.27.v20190418.jar;%APP_HOME%\lib\javax.servlet-api-3.1.0.jar;%APP_HOME%\lib\jetty-http-9.3.27.v20190418.jar;%APP_HOME%\lib\jetty-io-9.3.27.v20190418.jar;%APP_HOME%\lib\jetty-xml-9.3.27.v20190418.jar;%APP_HOME%\lib\jetty-util-ajax-9.3.27.v20190418.jar;%APP_HOME%\lib\jetty-util-9.3.27.v20190418.jar;%APP_HOME%\lib\jsp-api-2.1.jar;%APP_HOME%\lib\jersey-json-1.19.jar;%APP_HOME%\lib\jersey-servlet-1.19.jar;%APP_HOME%\lib\jersey-server-1.19.jar;%APP_HOME%\lib\jersey-client-1.19.jar;%APP_HOME%\lib\jersey-core-1.19.jar;%APP_HOME%\lib\commons-configuration2-2.1.1.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\zookeeper-3.4.10.jar;%APP_HOME%\lib\slf4j-log4j12-1.7.25.jar;%APP_HOME%\lib\log4j-1.2.17.jar;%APP_HOME%\lib\commons-lang-2.6.jar;%APP_HOME%\lib\commons-lang3-3.6.jar;%APP_HOME%\lib\avro-1.7.7.jar;%APP_HOME%\lib\metrics-core-3.2.6.jar;%APP_HOME%\lib\kerb-util-1.0.1.jar;%APP_HOME%\lib\kerb-identity-1.0.1.jar;%APP_HOME%\lib\kerby-config-1.0.1.jar;%APP_HOME%\lib\token-provider-1.0.1.jar;%APP_HOME%\lib\kerb-crypto-1.0.1.jar;%APP_HOME%\lib\kerb-core-1.0.1.jar;%APP_HOME%\lib\kerby-pkix-1.0.1.jar;%APP_HOME%\lib\slf4j-api-1.7.25.jar;%APP_HOME%\lib\re2j-1.1.jar;%APP_HOME%\lib\protobuf-java-2.5.0.jar;%APP_HOME%\lib\gson-2.2.4.jar;%APP_HOME%\lib\jsch-0.1.54.jar;%APP_HOME%\lib\jsr305-3.0.0.jar;%APP_HOME%\lib\htrace-core4-4.2.0-incubating.jar;%APP_HOME%\lib\commons-compress-1.4.1.jar;%APP_HOME%\lib\hadoop-hdfs-client-3.1.1.jar;%APP_HOME%\lib\jackson-jaxrs-json-provider-2.7.8.jar;%APP_HOME%\lib\jackson-module-jaxb-annotations-2.7.8.jar;%APP_HOME%\lib\jackson-jaxrs-base-2.7.8.jar;%APP_HOME%\lib\jackson-databind-2.7.8.jar;%APP_HOME%\lib\woodstox-core-5.0.3.jar;%APP_HOME%\lib\stax2-api-3.1.4.jar;%APP_HOME%\lib\netty-3.10.5.Final.jar;%APP_HOME%\lib\hbase-shaded-miscellaneous-2.2.1.jar;%APP_HOME%\lib\hbase-shaded-netty-2.2.1.jar;%APP_HOME%\lib\hbase-protocol-shaded-2.2.3.jar;%APP_HOME%\lib\hbase-shaded-protobuf-2.2.1.jar;%APP_HOME%\lib\audience-annotations-0.5.0.jar;%APP_HOME%\lib\joni-2.1.11.jar;%APP_HOME%\lib\jcodings-1.0.18.jar;%APP_HOME%\lib\commons-crypto-1.0.0.jar;%APP_HOME%\lib\findbugs-annotations-1.3.9-1.jar;%APP_HOME%\lib\javax.servlet.jsp-2.3.2.jar;%APP_HOME%\lib\javax.servlet.jsp-api-2.3.1.jar;%APP_HOME%\lib\jamon-runtime-2.4.1.jar;%APP_HOME%\lib\disruptor-3.3.6.jar;%APP_HOME%\lib\hadoop-distcp-2.8.5.jar;%APP_HOME%\lib\httpcore-4.4.4.jar;%APP_HOME%\lib\jsr311-api-1.1.1.jar;%APP_HOME%\lib\jettison-1.1.jar;%APP_HOME%\lib\jaxb-impl-2.2.3-1.jar;%APP_HOME%\lib\jackson-jaxrs-1.9.2.jar;%APP_HOME%\lib\jackson-xc-1.9.2.jar;%APP_HOME%\lib\jackson-mapper-asl-1.9.13.jar;%APP_HOME%\lib\jackson-core-asl-1.9.13.jar;%APP_HOME%\lib\paranamer-2.3.jar;%APP_HOME%\lib\snappy-java-1.0.5.jar;%APP_HOME%\lib\nimbus-jose-jwt-4.41.1.jar;%APP_HOME%\lib\json-smart-2.3.jar;%APP_HOME%\lib\xz-1.0.jar;%APP_HOME%\lib\jackson-annotations-2.7.8.jar;%APP_HOME%\lib\jackson-core-2.7.8.jar;%APP_HOME%\lib\okhttp-2.7.5.jar;%APP_HOME%\lib\jaxb-api-2.2.11.jar;%APP_HOME%\lib\jline-0.9.94.jar;%APP_HOME%\lib\error_prone_annotations-2.3.3.jar;%APP_HOME%\lib\jetty-6.1.26.jar;%APP_HOME%\lib\jetty-util-6.1.26.jar;%APP_HOME%\lib\commons-daemon-1.0.13.jar;%APP_HOME%\lib\xmlenc-0.52.jar;%APP_HOME%\lib\netty-all-4.0.23.Final.jar;%APP_HOME%\lib\leveldbjni-all-1.8.jar;%APP_HOME%\lib\jersey-container-servlet-core-2.25.1.jar;%APP_HOME%\lib\jersey-server-2.25.1.jar;%APP_HOME%\lib\jersey-client-2.25.1.jar;%APP_HOME%\lib\jersey-media-jaxb-2.25.1.jar;%APP_HOME%\lib\jersey-common-2.25.1.jar;%APP_HOME%\lib\javax.ws.rs-api-2.0.1.jar;%APP_HOME%\lib\javax.el-3.0.1-b12.jar;%APP_HOME%\lib\jcip-annotations-1.0-1.jar;%APP_HOME%\lib\accessors-smart-1.2.jar;%APP_HOME%\lib\kerby-xdr-1.0.1.jar;%APP_HOME%\lib\okio-1.6.0.jar;%APP_HOME%\lib\hk2-locator-2.5.0-b32.jar;%APP_HOME%\lib\hk2-api-2.5.0-b32.jar;%APP_HOME%\lib\hk2-utils-2.5.0-b32.jar;%APP_HOME%\lib\javax.inject-1.jar;%APP_HOME%\lib\aopalliance-1.0.jar;%APP_HOME%\lib\javax.annotation-api-1.2.jar;%APP_HOME%\lib\javax.inject-2.5.0-b32.jar;%APP_HOME%\lib\validation-api-1.1.0.Final.jar;%APP_HOME%\lib\asm-5.0.4.jar;%APP_HOME%\lib\jersey-guava-2.25.1.jar;%APP_HOME%\lib\osgi-resource-locator-1.0.1.jar;%APP_HOME%\lib\aopalliance-repackaged-2.5.0-b32.jar;%APP_HOME%\lib\javassist-3.20.0-GA.jar;%APP_HOME%\lib\kerby-asn1-1.0.1.jar;%APP_HOME%\lib\kerby-util-1.0.1.jar


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
