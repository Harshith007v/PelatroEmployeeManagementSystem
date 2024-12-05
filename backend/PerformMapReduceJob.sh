
#!/bin/bash

# Set environment variables for Hadoop and Java
JAVA_HOME="/usr/lib/jvm/jdk-23.0.1-oracle-x64"
HADOOP_HOME="/home/pelatro/hadoop-3.4.1"  
HADOOP_CONF_DIR="$HADOOP_HOME/etc/hadoop"
HBASE_HOME="/home/pelatro/hbase-2.5.10-bin/hbase-2.5.10"    
HADOOP_BIN="$HADOOP_HOME/bin"
HBASE_BIN="$HBASE_HOME/bin"

JAR_PATH="/home/pelatro/DemoMapReduce/build/libs/DemoMapReduce-0.0.1-SNAPSHOT-all.jar"

# Set Hadoop and Java home in the environment
export JAVA_HOME
export HADOOP_HOME
export HADOOP_CONF_DIR
export HBASE_HOME
export PATH=$JAVA_HOME/bin:$HADOOP_BIN:$HBASE_BIN:$PATH

# Check if HDFS and HBase are running
hadoop dfsadmin -report  > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Hadoop is not running. Please start Hadoop first."
  exit 1
fi

#hbase shell -e "status" > /dev/null 2>&1
#if [ $? -ne 0 ]; then
#  echo "HBase is not running. Please start HBase first."
#  exit 1
#fi

# Run the Java application using Hadoop
hadoop jar $JAR_PATH -Djava.security.manager=allow

# Exit the script if there's an error running the job
if [ $? -ne 0 ]; then
  echo "Error occurred while running the MapReduce job."
  exit 1
else
  echo "Job ran successfully."
fi


#crontab -e
#30 16 * * * /home/pelatro/PelatroProject/backend/PerformMapReduce.sh
