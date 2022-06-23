const {
    getNamedAccounts,
    getUnnamedAccounts,
    ethers,
    network,
} = require("hardhat")
const { developmentChains } = require("../../helper-hardhart-config")
const { asset, assert } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer

          const sendValue = ethers.utils.parseEther("0.05")

          beforeEach(async function () {
              deployer = (await getUnnamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()

              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )

              assert.equal(endingBalance.toString(), 0)
          })
      })
