import csv
import numpy
from sklearn import tree
from sklearn.metrics import mean_absolute_error
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix
from IPython.display import Image 
import pydotplus 

class IDS:
	def __init__(self):
		data_train=[]
		label_train = []
		with open("ModifiedKDDTrain+.csv","r") as f:
			for line in f:
				count = 0
				elems = line.strip().split(',')
				row = []
				for x in elems:
					if count != 17:
						try:
							row.append(float(x))
						except ValueError:
							pass
					else:
						try:
							label_train.append(float(x))
						except ValueError:
							pass
					count+=1
				data_train.append(row)


		#label.append(float(new_list[-1]))
		#print len(data_train)
		#print len(label_train)
		#print len(label)

		data_test = []
		label_test = []
		with open("ModifiedKDDTest+.csv","r") as f:
			for line in f:
				count = 0
				elems = line.strip().split(',')
				row = []
				for x in elems:
					if count != 17:
						try:
							row.append(float(x))
						except ValueError:
							pass
					else:
						try:
							label_test.append(float(x))
						except ValueError:
							pass
					count+=1
				data_test.append(row)

  		self.train_data_features = data_train
  		self.label_train = label_train
  		self.test_data_features = data_test
  		self.label_test = label_test
	  	decisionTree = tree.DecisionTreeClassifier()
	  	decisionTree = decisionTree.fit(self.train_data_features,self.label_train)
	  	predict=decisionTree.predict(self.test_data_features)
	  	accuracy=decisionTree.score(self.test_data_features,self.label_test)
	  	print "Accuracy for Decision trees:", accuracy
	  	print "Confusion Matrix:", confusion_matrix(self.label_test, predict)

	  	dot_data = tree.export_graphviz(decisionTree, out_file=None) 
	  	graph = pydotplus.graph_from_dot_data(dot_data) 
	  	graph.write_pdf("IDS.pdf")

IDS()