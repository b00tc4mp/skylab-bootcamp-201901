function mostrarTag(tag, indent) {
	console.log('\t'.repeat(indent) + tag.tagName);    
    for (let i = 0; i < tag.children.length; i++) { 
        mostrarTag(tag.children[i],indent+1);
    }
}

mostrarTag(document.getElementsByTagName("html")[0],0)