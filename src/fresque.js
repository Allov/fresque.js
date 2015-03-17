define(['jquery', 'router', 'knockout-utilities'],
    function($, router, koUtilities) {
        'use strict';
        
        var Fresque = function() {
            var self = this;
            
            self.pages = [];
        };
        
        Fresque.prototype.init = function() {
            var self = this;
            var deferred = new $.Deferred();
            
            var calls = [];
            
            // replace with api
            $.getJSON('/data/pages.json', function(pages) {
                for(var i in pages) {
                    calls.push($.getJSON('/data/' + pages[i], function(page) {
                        self.addPage(page);
                    }));
                }
                
                $.when.apply($, calls).done(function() {
                    deferred.resolve();
                });
            });
            
            return deferred.promise();
        };
        
        Fresque.prototype.registerTemplate = function(name, templateConfig) {
            templateConfig = templateConfig || {};
            
            koUtilities.registerComponent(name + "-template", {
                name: name + '-template',
                htmlOnly: false,
                basePath: templateConfig.basePath,
                isBower: templateConfig.isBower,
                type: "template"
            });
        };
        
        Fresque.prototype.addPage = function(page) {
            var self = this;
            
            var pageConfig = {
                url: page.url,
                title: page.title,
                params: {
                    page: page
                },
                requireAuthentication: page.requireAuthentication,
                excludedFromNav: page.excludedFromNav,
                hideNav: page.hideNav
            };
            
            router.addRoute(page.url, pageConfig, { name: page.template + '-template' });
            
            self.pages.push(page);
        };
        
        return new Fresque();
    });
