package com.project.pelatroEmployeeManagementSystem.mapreduce;

import java.io.IOException;

import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.io.ImmutableBytesWritable;
import org.apache.hadoop.hbase.mapreduce.TableMapper;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper.Context;

public class PerformanceMapper extends TableMapper<Text, Text>{
	
	
	@Override
	public void map(ImmutableBytesWritable rowKey, Result value, Context context) throws IOException, InterruptedException {
		
        String empId = Bytes.toString(value.getRow());
        String totalHours = Bytes.toString(value.getValue(Bytes.toBytes("time_details"), Bytes.toBytes("total_hours")));
        String totalPoints = Bytes.toString(value.getValue(Bytes.toBytes("project_details"), Bytes.toBytes("points")));
        
        context.write( new Text(empId), new Text(totalHours+","+totalPoints) );
		
	}

}
