import { browser, logging } from 'protractor';

export const noBrowserErrorsCheck = async () => {

    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);

    // Allow errors related to not being able to connect to the web scoket.
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].message.includes('http://localhost:5000/socket.io/?EIO')) {
        logs.splice(i, 1);
      }
    }

    console.log(logs);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));

};
