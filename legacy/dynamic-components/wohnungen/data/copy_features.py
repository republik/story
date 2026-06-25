mapzh_layer = QgsProject.instance().mapLayersByName('Bo_BoFlaeche_A')[0]
target_layer = resort_layer = QgsProject.instance().mapLayersByName('gemeinnützige_stadt_zh')[0]

features = mapzh_layer.selectedFeatures()

target_layer.startEditing()
data_provider = target_layer.dataProvider()
data_provider.addFeatures(features)
target_layer.commitChanges()