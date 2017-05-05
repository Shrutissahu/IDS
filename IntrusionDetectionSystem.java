import java.util.*;
import java.io.*;
import java.io.IOException.*; 

/*Process p = Runtime.getRuntime().exec("python yourapp.py");*/

class IntrusionDetectionSystem{
	public static void main(String[] args) throws IOException{
		AlterData alterData = new AlterData();
		alterData.alteringData();

		
		final Timer timer = new Timer();
		timer.schedule(new TimerTask(){
			public void run(){
					try {
						String s = null;
			            Process p = Runtime.getRuntime().exec("python intrusionDetection.py");
			            
			            BufferedReader stdInput = new BufferedReader(new 
			                 InputStreamReader(p.getInputStream()));

			            BufferedReader stdError = new BufferedReader(new 
			                 InputStreamReader(p.getErrorStream()));

			            // Reading the output from the command
			            while ((s = stdInput.readLine()) != null) {
			                System.out.println(s);
			                
			            }
			            
			       
			        	//In case of any errors in the script
			            while ((s = stdError.readLine()) != null) {
			                System.out.println(s);
			            }
			        }
			        catch (IOException e) {
			            e.printStackTrace();
			        }
		       }
	       }, 1000, 1000*60*60
	    );
		
	}
}