var _cpbTrckr;

function _cpbTrckrClass() {
    this.loaded=false;
    this.gaID='UA-85922709-7';
    this.gaName='_ga_cptracker';
    this.loadGA2();
}
_cpbTrckrClass.prototype = {
    constructor:_cpbTrckrClass,
    loadGA2(){
        if(this.loaded){
            return;
        }
        var t=this;
        this.loaded=true;
        if(typeof window.ga === 'undefined'){
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        }
        ga(function() {
            t.tracker = ga.create(t.gaID, 'auto', t.gaName);
        })
    },
    event(name, label, value){
        ga(function () {
            var t =  ga.getByName(_cpbTrckr.gaName);
            var f = {
                eventCategory: "VisitorEvents",
                eventAction: name,
                eventLabel: label
            };
            if(value)f.value=value;
            t.send('event', f);
        })
        return this;
    },
    setUserId(userId){
        ga(function () {
            var t =  ga.getByName(_cpbTrckr.gaName);
            t.set('userId', userId);
        });
        return this;
    }
}
_cpbTrckr = new _cpbTrckrClass();

if(typeof window.CPABUILDContentLocker === 'object' && CPABUILDContentLocker.uid){
    _cpbTrckr.setUserId(CPABUILDContentLocker.uid).event('lockerJS_pageload', 'Locker JS Pageload');
}
