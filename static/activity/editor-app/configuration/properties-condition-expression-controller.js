/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
 * Condition expression
 */

var KisBpmConditionExpressionCtrl = [ '$scope', '$modal', function($scope, $modal) {

    // Config for the modal window
    var opts = {
        template:  'editor-app/configuration/properties/condition-expression-popup.html?version=' + Date.now(),
        scope: $scope
    };

    // Open the dialog
    $modal(opts);
}];

var KisBpmConditionExpressionPopupCtrl = [ '$scope', '$translate', '$http', function($scope, $translate, $http) {
    $scope.conditionExpressionList = []
    $scope.condionValue  = {value: ''};
    $scope.linkConditionList = [{
        linkConditionName:'并且',linkConditionType:' && '
    },{
        linkConditionName:'或者',linkConditionType:' || '
    }]
    var conditionArr1 = []
    console.log($scope.property.value)
	// Put json representing condition on scope
    if ($scope.property.value !== undefined && $scope.property.value !== null) {
        var reg = /( && | \|\| )/ig;
        $scope.conditionExpression = {value: $scope.property.value};
        if($scope.conditionExpression.value) {
            var conditionString = $scope.conditionExpression.value
            var lengths = conditionString.length-3;
            conditionString = conditionString.substr(2,lengths);
            var conditionArr = conditionString.split(reg);
            console.log(conditionArr)
            if(conditionArr&&conditionArr.length>0) {
                conditionArr1.push(conditionArr[0])
                for(var i=0;i<conditionArr.length;i++) {
                    if(conditionArr[i] === ' && ' || conditionArr[i] === ' || ') {
                        conditionArr1.push(conditionArr[i]+conditionArr[i+1])
                    }
                }
                console.log(conditionArr1)
            }
        }
        
    } else {
        $scope.conditionExpression = {value: ''};
    }

    $scope.getParamList = function (successCallback) {
        $http({
            method: 'get',
            headers: {'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'},
            url: 'https://dev.zdsxc.com/activiti/act/getParamList'})

            .success(function (data, status, headers, config) {
                var obj = data.data;
                $scope.paramList = obj;
                if(conditionArr1&&conditionArr1.length>0) {
                    var dataArr = []
                    for(var i=0;i<conditionArr1.length;i++) {
                        var dataObj = {}
                        for(var j=0;j<obj.length;j++) {
                            if(conditionArr1[i].indexOf(obj[j].param)!=-1) {
                                var paramInfo = angular.fromJson(obj[j].paramInfo)
                                dataObj.name = obj[j].name
                                dataObj.param = obj[j].param
                                dataObj.condionList = angular.fromJson(paramInfo);
                                if(paramInfo&&paramInfo.length>0) {
                                    for(var m=0;m<paramInfo.length;m++) {
                                        if(conditionArr1[i].indexOf(paramInfo[m].paramInfoType)!=-1) {
                                            var lengths = conditionArr1[i].indexOf(paramInfo[m].paramInfoType)
                                            dataObj.condionValue = conditionArr1[i].substr((lengths+paramInfo[m].paramInfoType.length),conditionArr1[i].length);
                                            dataObj.paramInfoName = paramInfo[m].paramInfoName
                                            dataObj.paramInfoType = paramInfo[m].paramInfoType
                                        }
                                    }
                                }
                            }
                        }
                        for(var n=0;n<$scope.linkConditionList.length;n++) {
                            if(conditionArr1[i].indexOf($scope.linkConditionList[n].linkConditionType)!=-1) {
                                dataObj.linkConditionName = $scope.linkConditionList[n].linkConditionName,
                                dataObj.linkConditionType = $scope.linkConditionList[n].linkConditionType
                            }
                        }
                        dataArr.push(dataObj)
                    }
                    $scope.conditionExpressionList = dataArr
                    console.log(dataArr)
                }
            })
            .error(function (data, status, headers, config) {
            });
    };
    $scope.getParamList(function(){});
	$scope.selectParamChange = function(item) { 
        if($scope.paramList&&$scope.paramList.length>0) {
            for(var j=0; j<$scope.paramList.length; j++) {
                if(item.name == $scope.paramList[j].name) {
                    item.condionValue = ''
                    item.type = $scope.paramList[j].type;
                    item.param = $scope.paramList[j].param
                    item.condionList = angular.fromJson($scope.paramList[j].paramInfo);
                    item.paramInfoName = angular.fromJson($scope.paramList[j].paramInfo)[0].paramInfoName
                    item.paramInfoType = angular.fromJson($scope.paramList[j].paramInfo)[0].paramInfoType
                }
            }
        }
    }
    $scope.selectCondionChange = function(item) {
        if(item.condionList&&item.condionList.length>0) {
            for(var i=0;i<item.condionList.length;i++) {
                if(item.condionList[i].paramInfoName == item.paramInfoName) {
                    item.paramInfoType = item.condionList[i].paramInfoType
                }
            }
        } 
    }
    $scope.selectLinkCondition = function(item) { 
        for(var i=0;i<$scope.linkConditionList.length;i++) {
            if($scope.linkConditionList[i].linkConditionName == item.linkConditionName) {
                item.linkConditionType = $scope.linkConditionList[i].linkConditionType
            }
        }
        console.log(item)
    }
    // Click handler for + button after enum value
    $scope.addCandidateUserValue = function(index) {
        var obj = {
            linkConditionType:$scope.linkConditionList[0].linkConditionType,
            linkConditionName:$scope.linkConditionList[0].linkConditionName,
            name:$scope.paramList[0].name,
            param:$scope.paramList[0].param,
            paramInfoName:angular.fromJson($scope.paramList[0].paramInfo)[0].paramInfoName,
            paramInfoType:angular.fromJson($scope.paramList[0].paramInfo)[0].paramInfoType,
            condionValue:'',
            condionList:angular.fromJson($scope.paramList[0].paramInfo)
        }
        $scope.conditionExpressionList.splice(index + 1, 0, obj);
    };

    // Click handler for - button after enum value
    $scope.removeCandidateUserValue = function(index) {
        $scope.conditionExpressionList.splice(index, 1);
    };

    $scope.save = function() {
        var dataArr = []
        var expressionValue = ''
        var expArr = $scope.conditionExpressionList
        console.log($scope.conditionExpressionList)
        // condionObj.condionValue = $scope.conditionExpressionList[0].condionValue
        if(expArr&&expArr.length>0) {
            for(var j=0; j<expArr.length; j++) { 
                if(j==0) {
                    expressionValue += expArr[j].param + expArr[j].paramInfoType + expArr[j].condionValue
                } else {
                    expressionValue += (expArr[j].linkConditionType?expArr[j].linkConditionType:'') + expArr[j].param + expArr[j].paramInfoType + expArr[j].condionValue 
                }
                console.log(expressionValue)
                dataArr.push({
                    name:expArr[j].name,
                    param:expArr[j].param,
                    paramInfoName:expArr[j].paramInfoName,
                    paramInfoType:expArr[j].paramInfoType,
                    linkConditionName:expArr[j].linkConditionName,
                    linkConditionType:expArr[j].linkConditionType,
                    condionValue:expArr[j].condionValue,
                })
            }
            expressionValue = '${' +expressionValue + '}'
        } 
        $scope.property.value = expressionValue
        $scope.updatePropertyInModel($scope.property);
        $scope.close();
    };

    // Close button handler
    $scope.close = function() {
    	$scope.property.mode = 'read';
    	$scope.$hide();
    };
}];