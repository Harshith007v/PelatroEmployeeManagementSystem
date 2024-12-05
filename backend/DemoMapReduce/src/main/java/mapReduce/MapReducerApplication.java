package mapReduce;


import java.io.IOException;

public class MapReducerApplication {

	public static void main(String[] args) {
		
		PerformanceTracker tracker = new PerformanceTracker();
		try {
			tracker.performaceDriver();
		}
		catch ( ClassNotFoundException e ) {
			e.printStackTrace();
		}
		catch ( IOException e ) {
			e.printStackTrace();
		}
		catch ( InterruptedException e ) {
			e.printStackTrace();
		}
		
	}

}