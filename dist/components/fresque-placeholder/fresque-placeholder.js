define(['text!./fresque-placeholder.html', 'knockout', 'lodash', 'fresque'],
    function(template, ko, _, fresque) {
        'use strict';
        
        var ViewModel = function (params, componentInfo) {
            var self = this;
            
            self.components = _.where(params.components, { 'placeholder': params.name });
        };

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new ViewModel(params, componentInfo);
                }
            },
            template: template
        };
    });