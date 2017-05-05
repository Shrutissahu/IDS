import java.util.*;
import java.io.*;
import java.io.IOException.*;


/*
2,3,4,5,6,7,8,10,11,14,22,23,24,28,30,36,39
*/
class AlterData{
	public void alteringData() throws IOException{
		//Modifying the original data set in order to work with some features
		modifyData("KDDTrain+.csv");
		modifyData("KDDTest+.csv");

	}	

	public void modifyData(String fileName) throws IOException{
		File file = new File(fileName);
		FileReader fr = null;
		BufferedReader br = null;
		int protocolCounter = 0;
		HashMap<String, Integer> protocol = new HashMap<String, Integer>();

		int serviceCounter = 0;
		HashMap<String, Integer> service = new HashMap<String,Integer>();

		int flagCounter = 0;
		HashMap<String, Integer> flag = new HashMap<String,Integer>();

		int classificationCounter=0;
		HashMap<String, Integer> classification = new HashMap<String, Integer>();
		classification.put("normal",0);
		classification.put("intrusion", 1);

		FileWriter fw = null;
		BufferedWriter bw = null;
		String line="";
		String delimiter = ",";

		try{
			fr = new FileReader(file);
			br = new BufferedReader(fr);
	
			//Labeling the String values and assigning them a int value 
			while((line=br.readLine())!=null){
				String data[] = line.split(delimiter);
				if(!protocol.containsKey(data[1].trim())){
					protocol.put(data[1], ++protocolCounter);
				}
				if(!service.containsKey(data[2].trim())){
					service.put(data[2], ++serviceCounter);
				}

				if(!flag.containsKey(data[3].trim())){
					flag.put(data[3], ++flagCounter);
				}

			}
			fw= new FileWriter(new File("count1_"+fileName));
			bw = new BufferedWriter(fw);
			fr = new FileReader(file);
			br = new BufferedReader(fr);
			int normal_count = 0;
			int intrusion_count = 0;
			//Creating a new training and test data sets
			while((line=br.readLine())!=null){
				String data[] = line.split(delimiter);
				if(data[41].trim().equalsIgnoreCase("normal")){
					//normal_count++;
					//fw.append(Integer.toString(classification.get("normal")));
					fw.append("1");	
				}else{
					//fw.append(Integer.toString(classification.get("intrusion")));
					intrusion_count++;
					fw.append("2");	
				}
				
				
			}
			// fw.append("normal_count,intrusion_count");
			// fw.append("\n");
			// fw.append(Integer.toString(normal_count));
			// fw.append(",");
			// fw.append(Integer.toString(intrusion_count));
			//System.out.println(normal_count);

		} catch(Exception e){
			e.printStackTrace();
		} finally{
			fw.close();
			fr.close();
			br.close();
		}

	}
}