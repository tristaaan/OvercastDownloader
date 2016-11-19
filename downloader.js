var link = document.createElement('a');
link.download = document.title.replace(/ /g, '_');
link.href = document.querySelector('#audioplayer > source').getAttribute('src');
link.click();
link.parentNode.removeChild(link);
