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
			fw= new FileWriter(new File("Modified"+fileName));
			bw = new BufferedWriter(fw);
			fr = new FileReader(file);
			br = new BufferedReader(fr);

			//Creating a new training and test data sets
			while((line=br.readLine())!=null){
				String data[] = line.split(delimiter);
				fw.append(Integer.toString(protocol.get(data[1].trim())));
				fw.append(delimiter);
				fw.append(Integer.toString(service.get(data[2].trim())));
				fw.append(delimiter);
				fw.append(Integer.toString(flag.get(data[3].trim())));
				fw.append(delimiter);
				fw.append(data[4].trim());
				fw.append(delimiter);
				fw.append(data[5].trim());
				fw.append(delimiter);
				fw.append(data[6].trim());
				fw.append(delimiter);
				fw.append(data[7].trim());
				fw.append(delimiter);
				fw.append(data[9].trim());
				fw.append(delimiter);
				fw.append(data[10].trim());
				fw.append(delimiter);
				fw.append(data[13].trim());
				fw.append(delimiter);
				fw.append(data[21].trim());
				fw.append(delimiter);
				fw.append(data[22].trim());
				fw.append(delimiter);
				fw.append(data[23].trim());
				fw.append(delimiter);
				fw.append(data[27].trim());
				fw.append(delimiter);
				fw.append(data[29].trim());
				fw.append(delimiter);
				fw.append(data[35].trim());
				fw.append(delimiter);
				fw.append(data[38].trim());
				fw.append(delimiter);
				if(data[41].trim().equalsIgnoreCase("normal")){
					fw.append(Integer.toString(classification.get("normal")));	
				}else{
					fw.append(Integer.toString(classification.get("intrusion")));	
				}
				fw.append(delimiter);
				fw.append("\n");
			}
		} catch(Exception e){
			e.printStackTrace();
		} finally{
			fw.close();
			fr.close();
			br.close();
		}

	}
}