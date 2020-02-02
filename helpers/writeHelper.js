module.exports = (NODE, register, value) => {
    return new Promise((resolve, reject) => {
        if (NODE.conn) {
            NODE.conn.writeItems(register, value, (anythingBad) => { // // Set ll1 M150 true
                NODE.doneWriting = true;
                if (anythingBad) { 
                    console.log("CANNOT WRITE!!!!"); 
                    
                    // Try once again.
                    setTimeout(() => {
                        NODE.conn.writeItems(register, value, (anythingBad) => { // // Set ll1 M150 true
                            NODE.doneWriting = true;
                            if (anythingBad) { 
                                console.log("CANNOT WRITE 2ND TIME!!!!"); 
                                
                                 // Try once again.
                                setTimeout(() => {
                                    NODE.conn.writeItems(register, value, (anythingBad) => { // // Set ll1 M150 true
                                        NODE.doneWriting = true;
                                        if (anythingBad) { 
                                            console.log("CANNOT WRITE 3RD TIME!!!!"); 
                                            reject("CANNOT WRITE 3RD TIME!!!!");
                                        } else {
                                            resolve(register);
                                        }
                                    });
                                }, 1000);

                            } else {
                                resolve(register);
                            }
                        });
                    }, 1000);

                    
                } else {
                    resolve(register);
                }
            });
        }
    }); 
};