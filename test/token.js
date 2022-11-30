// import expect from chai
const { expect } = require("chai");

// describe the contract
describe("Token contract", function () {
    // get token instance, deployed instance, and all addresses
    let token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    // use beforeEach hook
    beforeEach(async function () {
        // create token instance
        token = await ethers.getContractFactory("Token");

        // get all adddress
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // create deployed token instance
        hardhatToken = await token.deploy()
    })

    // desccribe deplyement
    describe("Deployment", function () {
        // Should set the right owner 
        it('Should set the right owner', async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address)
        })

        // Should assign the total supply of tokens to the owner
        it("Should assign the total supply of tokens to the owner", async () => {
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(await hardhatToken.totalSupply())
        })
    })

    // describe transactions
    describe("Transactions", () => {
        // Should trasfer tokens between accounts
        it("Should trasfer tokens between accounts", async () => {
            // check for, from owner to addr1
            await hardhatToken.transfer(addr1.address, 5);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(5);

            // check for, from addr1 to addr2
            await hardhatToken.connect(addr1).transfer(addr2.address, 5);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
        })


        // Should fail if sender does not have enough tokens
        it("Should fail if sender does not have enough tokens", async () => {
            // get intital owner balance
            const initalBalance = await hardhatToken.balanceOf(owner.address);

            // transfer from addr1 to owner check the revert msg
            await expect(hardhatToken.connect(addr1).transfer(addr1.address, 5))
                .to.be.revertedWith('Not enough tokens');

            // check the current owner balnce with initial store balnce
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initalBalance);
        })


        // Should update balances after transfers
        it("Should update balances after transfers", async () => {
            // get initial owner balance 
            const initalBalance = await hardhatToken.balanceOf(owner.address);

            // transfer from owner to addr1
            await hardhatToken.transfer(addr1.address, 5);

            // transfer from owner to addr2
            await hardhatToken.transfer(addr2.address, 10);

            // get final owner balance
            const finalBalance = await hardhatToken.balanceOf(owner.address);

            // check inital and final balnce are equal
            expect(initalBalance - 15).to.equal(finalBalance);

            // check addr1 bal
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(5)

            // check addr2 bal
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(10)
        })

    })
})



