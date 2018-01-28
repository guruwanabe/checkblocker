function AdBlock($strSelector, $strSrc, $strUrl, $intWidth, $intHeight) {
    this.strSrc = $strSrc;
    this.strUrl = $strUrl;
    this.strSelector = $strSelector;
    this.blnBlockActive = false;
    this.intTimeout = 100;
    this.intWidth = $intWidth;
    this.intHeight = $intHeight;
}
AdBlock.prototype = {
    objTest: null,
    init: function() {
        if (this.objTest == null) {
            this.runTest();
        }
    },
    setContent: function() {
        var objElement = this.setSelector();
        if (typeof (objElement) != 'undefined' && objElement != null) {
            this.removeChildElements(objElement);
            objElement.style.setProperty('display', 'none');
            var objImage = document.createElement('img');
            objImage.src = this.strSrc;
            objImage.style.setProperty('display', 'block', 'important');
            if (typeof (this.intWidth) != 'undefined' && this.intWidth != null) {
                objImage.setAttribute('width', this.intWidth);
                objElement.style.setProperty('width', this.intWidth);
            }
            if (typeof (this.intHeight) != 'undefined' && this.intHeight != null) {
                objImage.setAttribute('height', this.intHeight);
                objElement.style.setProperty('height', this.intHeight);
            }
            var objAnchor = document.createElement('a');
            objAnchor.href = this.strUrl;
            objAnchor.setAttribute('style', 'display: block');
            objAnchor.appendChild(objImage);
            objElement.appendChild(objAnchor);
            setTimeout(function() {
                objElement.style.setProperty('display', 'block', 'important');
            }, this.intTimeout + 900);
        } else {
            console.log('Selector is "undefined || null", we need one to inject the content!');
        }
        return this;
    },
    setPosition: function($strPostion, $obj) {
        try {
            if ($strPostion != null) {
                if (($strPostion === 'body' || $strPostion === 'head')) {
                    document.getElementsByTagName($strPostion)[0].appendChild($obj);
                } else {
                    if (this.objTest === null) {
                        document.body.appendChild($obj);
                    } else {
                        document.body.replaceChild($obj, this.objTest);
                    }
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    },
    setSelector: function() {
        return document.getElementById(this.strSelector);
    },
    setTextNode: function($obj, $node) {
        $obj.appendChild(document.createTextNode($node));
    },
    setClass: function($obj, $class) {
        return document.getElementsByTagName($obj)[0].classList.add($class);
    },
    removeChildElements: function($obj) {
        while ($obj.lastChild) {
            $obj.removeChild($obj.lastChild);
        }
    },
    runTest: function() {
        var self = this;
        var objTestElement = document.createElement('div');
        objTestElement.setAttribute('class', 'adsbox');
        objTestElement.setAttribute('display', 'block');
        this.setTextNode(objTestElement, '&nbsp;');
        this.setPosition('body', objTestElement);
        setTimeout(function() {
            if (objTestElement.offsetHeight === 0) {
                self.blnBlockActive = true;
                if (self.blnBlockActive === true && self.objTest != null) {
                    self.setClass('body', 'adblock');
                    self.setContent();
                }
            }
            objTestElement.parentNode.removeChild(objTestElement);
        }, this.intTimeout);
        this.objTest = objTestElement;
    }
};
