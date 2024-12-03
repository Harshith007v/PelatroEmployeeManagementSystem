package com.project.pelatroEmployeeManagementSystem.mapreduce;


import java.io.IOException;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;

public class PerformanceReducer extends Reducer<Text, Text, Text, Text>{
	
	private double totalHoursOverall = 0.0;
    private double totalPointsOverall = 0.0;
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		
		double totalHours=0.0;
		double totalPoints=0.0;
		
		for(Text val : values) {
			String data[]=val.toString().split( "," );
			double hours= Double.parseDouble( data[0] );
            double points = Double.parseDouble(data[1]);
            
            totalHours += hours;
            totalPoints += points;
		}
		
        double performance = totalPoints / totalHours;
        
        context.write( key, new Text("Total Hours: " + totalHours + ", Total Points: " + totalPoints + ", Performance: " + performance) );
        
        totalHoursOverall += totalHours;
        totalPointsOverall += totalPoints;
	}
	
	@Override
    protected void cleanup(Context context) throws IOException, InterruptedException {
        super.cleanup(context);
        
        if (totalHoursOverall > 0.0) {
            double overallPerformance = totalPointsOverall / totalHoursOverall;
            context.write(new Text("Overall Performance"), new Text("Total Hours: " + totalHoursOverall + ", Total Points: " + totalPointsOverall + ", Overall Performance: " + overallPerformance));
        } else {
            context.write(new Text("Overall Performance"), new Text("No data available for overall performance."));
        }
    }

}
