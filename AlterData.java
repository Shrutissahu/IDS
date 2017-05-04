import java.util.*;
import java.io.*;


/*
2,3,4,5,6,7,8,10,11,14,22,23,24,28,30,36,39
*/
class AlterData{
	public static void main(String[] args){

		modifyData("KDDTrain+.csv");
		modifyData("KDDTest+.csv");

	}	

	public static void modifyData(String fileName){
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

		FileWriter fw = null;
		BufferedWriter bw = null;
		String line="";
		String delimiter = ",";

		try{
			fr = new FileReader(file);
			br = new BufferedReader(fr);
	
			
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

				if(!classification.containsKey(data[41].trim())){
					classification.put(data[41], ++classificationCounter);
				}
			}
			fw= new FileWriter(new File("Modified"+fileName));
			bw = new BufferedWriter(fw);
			fr = new FileReader(file);
			br = new BufferedReader(fr);
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
				fw.append(Integer.toString(classification.get(data[41].trim())));
				fw.append(delimiter);
				fw.append("\n");
			}
		} catch(Exception e){
			e.printStackTrace();
		}

		System.out.println("\nProtocol");
		for(String key : protocol.keySet()){
			System.out.println(key +"-->"+ protocol.get(key));
		}

		System.out.println("\nService");
		for(String key : service.keySet()){
			System.out.println(key +"-->"+ service.get(key));
		}

		System.out.println("\nFlag");
		for(String key : flag.keySet()){
			System.out.println(key +"-->"+ flag.get(key));
		}

		System.out.println("\nclassification");
		for(String key : classification.keySet()){
			System.out.println(key +"-->"+ classification.get(key));
		}
	}
}