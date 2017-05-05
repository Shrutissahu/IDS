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
#				print(elems);
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
	  	predict=decisionTree.predict(self.train_data_features)
	  	accuracy=decisionTree.score(self.train_data_features,self.label_train)
	  	print "-----------------------------Training Data Results-----------------------------"
	  	print "Accuracy for Decision trees:", accuracy
	  	print "Confusion Matrix:", confusion_matrix(self.label_train, predict)

#	  	dot_data = tree.export_graphviz(decisionTree, out_file=None) 
#	  	graph = pydotplus.graph_from_dot_data(dot_data) 
#	  	graph.write_pdf("TrainingSet.pdf")

	  	print "-----------------------------Test Data Results-----------------------------"
	  	predict=decisionTree.predict(self.test_data_features)
	  	accuracy=decisionTree.score(self.test_data_features,self.label_test)
	  	print "Accuracy for Decision trees:", accuracy
	  	print "Confusion Matrix:", confusion_matrix(self.label_test, predict)

#	  	dot_data = tree.export_graphviz(decisionTree, out_file=None) 
#	  	graph = pydotplus.graph_from_dot_data(dot_data) 
#	  	graph.write_pdf("TestSet.pdf")




		print("*********************** ENSEMBLE LEARNING ****************************************")
		

		from sklearn import linear_model
		
		from sklearn.ensemble import VotingClassifier
		from sklearn.ensemble import AdaBoostClassifier
		from sklearn.ensemble import RandomForestClassifier

		from sklearn.model_selection import cross_val_score

		from sklearn.base import BaseEstimator
		from sklearn.base import ClassifierMixin

		from sklearn.neighbors import KNeighborsClassifier

		from sklearn.neural_network import MLPClassifier

		from sklearn.naive_bayes import GaussianNB

		neural = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(20,), random_state=1)
		neural = neural.fit(self.train_data_features,self.label_train)
		y_pred=neural.predict(self.train_data_features)
		n_accuracy=neural.score(self.train_data_features,self.label_train)
		print "Neural Network Accuracy on Training Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_train, y_pred)

		print "-----------------------------Test Data Results-----------------------------"
	  	predict=neural.predict(self.test_data_features)
	  	accuracy=neural.score(self.test_data_features,self.label_test)
	  	print "Neural Network Accuracy on Test Data:", accuracy
	  	print "Confusion Matrix:", confusion_matrix(self.label_test, predict)


		dec_tree_cls = tree.DecisionTreeClassifier()
		dec_tree_cls = dec_tree_cls.fit(self.train_data_features,self.label_train)
		y_pred=dec_tree_cls.predict(self.train_data_features)
		n_accuracy=dec_tree_cls.score(self.train_data_features,self.label_train)
		print "Decision trees Accuracy on Training Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_train, y_pred)

		y_pred=dec_tree_cls.predict(self.test_data_features)
		n_accuracy=dec_tree_cls.score(self.test_data_features,self.label_test)
		print "Decision trees Accuracy on Test Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_test, y_pred)

		knn_cls = KNeighborsClassifier(n_neighbors=7)
		knn_cls = knn_cls.fit(self.train_data_features,self.label_train)
		y_pred=knn_cls.predict(self.train_data_features)
		n_accuracy=knn_cls.score(self.train_data_features,self.label_train)
		print "KNN(5) Accuracy on Train Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_train, y_pred)


		y_pred=knn_cls.predict(self.test_data_features)
		n_accuracy=knn_cls.score(self.test_data_features,self.label_test)
		print "KNN(5) Accuracy on Test Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_test, y_pred)

		gnb = GaussianNB()
		gnb = gnb.fit(self.train_data_features,self.label_train)
		y_pred=gnb.predict(self.train_data_features)
		n_accuracy=gnb.score(self.train_data_features,self.label_train)
		print "GaussianNB Accuracy on Train Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_train, y_pred)

		y_pred=gnb.predict(self.test_data_features)
		n_accuracy=gnb.score(self.test_data_features,self.label_test)
		print "GaussianNB Accuracy on Test Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_test, y_pred)

		reg_log = linear_model.LogisticRegression()
		reg_log = reg_log.fit(self.train_data_features,self.label_train)
		y_pred=reg_log.predict(self.train_data_features)
		n_accuracy=reg_log.score(self.train_data_features,self.label_train)
		print "Logistic reg_logression Accuracy on Train Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_train, y_pred)

		y_pred=reg_log.predict(self.test_data_features)
		n_accuracy=reg_log.score(self.test_data_features,self.label_test)
		print "Logistic reg_logression Accuracy on Test Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_test, y_pred)




		# print("***************************************************************")

		eclassifier_1 = VotingClassifier(estimators=[
		    ('nn', neural), ('knn', knn_cls), ('reg_logr', reg_log), ('gnb', gnb),('tree',dec_tree_cls)], voting='hard')
		eclassifier_1 = eclassifier_1.fit(self.train_data_features,self.label_train)
		y_pred=eclassifier_1.predict(self.train_data_features)
		n_accuracy=eclassifier_1.score(self.train_data_features,self.label_train)
		print "Classifier 1 on Train Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_train, y_pred)

		y_pred=eclassifier_1.predict(self.test_data_features)
		n_accuracy=eclassifier_1.score(self.test_data_features,self.label_test)
		print "Classifier 1 on Test Data:", n_accuracy
		print "Confusion Matrix:", confusion_matrix(self.label_test,y_pred)



		print("*********************** ENSEMBLE LEARNING TEST ON DATA ****************************************")

IDS()


