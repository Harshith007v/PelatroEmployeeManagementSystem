package mapReduce;

import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.mapreduce.TableMapReduceUtil;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class PerformanceTracker{


    public void performaceDriver() throws IOException, ClassNotFoundException, InterruptedException {
        Configuration config = new Configuration();
        config.set("hadoop.security.authentication", "simple");
        config.set("fs.defaultFS", "hdfs://localhost:9000");
        config.set("hbase.zookeeper.quorum", "localhost");
        config.set("hbase.zookeeper.property.clientPort", "2181");

        Path outputPath = new Path("hdfs://localhost:9000/user/hadoop/performance_output");
        Path localOutputPath1 = new Path("file:///home/pelatro/HdfsOutput");
        Path localOutputPath2 = new Path("file:///home/pelatro/PelatroProject/frontend/ems/src/assets/Files");

        FileSystem fs = FileSystem.get(config);
        if (fs.exists(outputPath)) {
            fs.delete(outputPath, true);
            System.out.println("Existing output folder deleted.");
        }

        Job job = Job.getInstance(config, "Employee performance calculator");

        job.setJarByClass(PerformanceTracker.class);

        TableMapReduceUtil.initTableMapperJob("employee", new Scan(), PerformanceMapper.class, Text.class, Text.class, job);

        job.setReducerClass(PerformanceReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        FileOutputFormat.setOutputPath(job, outputPath);

        boolean success = job.waitForCompletion(true);
        if (!success) {
            System.exit(1);
        }

        System.out.println("Job completed successfully.");

        FileSystem localFs = FileSystem.getLocal(config);
        if (localFs.exists(localOutputPath1)) {
            localFs.delete(localOutputPath1, true);
            System.out.println("Existing local output 1 folder deleted.");
        }
        
        if (localFs.exists(localOutputPath2)) {
            localFs.delete(localOutputPath2, true);
            System.out.println("Existing local output 2 folder deleted.");
        }

        fs.copyToLocalFile(outputPath, localOutputPath1);
        fs.copyToLocalFile(outputPath, localOutputPath2);
        
        System.out.println("Output copied to local file system: " + localOutputPath1);
        System.out.println("Output copied to local file system: " + localOutputPath2);
    }

   
}
