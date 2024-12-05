package consumer;

import java.io.IOException;

public class DataLoaderApp {

	public static void main(String[] args) {
		 try {

			 	ConsumerImp consumer = new ConsumerImp();
		        Thread workerThread = new Thread(consumer);
		        workerThread.start();
	            
	            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
	                System.out.println("Shutting down...");
	                consumer.stopWorkerThread();
	            }));

	            System.out.println("ConsumerImp is running. Press Ctrl+C to exit.");
	            while (true) {
	                Thread.sleep(1000);
	            }

	        } catch (IOException | InterruptedException e) {
	            e.printStackTrace();
	        }
	}

}
