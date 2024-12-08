package mapReduce;


import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;

public class PerformanceReducer extends Reducer<Text, Text, Text, Text>{
	
	private double totalSecuredPointsOverall = 0.0;
    private double totalPointsOverall = 0.0;
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		
		double totalSecuredPoints=0.0;
		double totalPoints=0.0;
		
		for(Text val : values) {
			String data[]=val.toString().split( "," );
			double hours= Double.parseDouble( data[0] );
            double points = Double.parseDouble(data[1]);
            double securedPoints=0.0;
            
            if(points==2.5)
            {
            	securedPoints = (2/hours) * points; 
            }
            else if(points==5)
            {
            	securedPoints = (4/hours) * points; 
            }
            else if(points==7.5)
            {
            	securedPoints = (6/hours) * points; 
            }
            else if(points==10)
            {
            	securedPoints = (8/hours) *points;
            }
            
            totalSecuredPoints += securedPoints;
            totalPoints += points;
		}
		
        double performance = (totalSecuredPoints/totalPoints )*100*0.5;
        
        context.write( key, new Text("Total Secured points: " + totalSecuredPoints + ", Total Points: " + totalPoints + ", Performance: " + performance) );
        
        totalSecuredPointsOverall += totalSecuredPoints;
        totalPointsOverall += totalPoints;
	}
	
	@Override
    protected void cleanup(Context context) throws IOException, InterruptedException {
		super.cleanup(context);

		String extractionDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        // Calculate overall performance
        if (totalSecuredPointsOverall > 0.0) {
            double overallPerformance = (totalPointsOverall / totalSecuredPointsOverall) * 100;
            context.write(new Text("Overall Performance"), new Text("Total Secured Points : " + totalSecuredPointsOverall + ", Total Points: " + totalPointsOverall + ", Overall Performance: " + overallPerformance+ ", Extraction Date: " + extractionDate));
        } else {
            context.write(new Text("Overall Performance"), new Text("No data available for overall performance."));
        }
    }

}

