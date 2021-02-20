import {getConfig} from '../../helpers/config'
import {Manager} from '../manager'

export class CountingManager extends Manager {
    getName() {
        return 'counting'
    }

    preInit(bot) {
        bot.on('messageUpdate', (oldMsg, newMsg) => {
            if (oldMsg.content === newMsg.content) return
            this.checkMessage(newMsg)
        })
    }

    onMessage(message) {
        this.checkMessage(message)
    }

    checkMessage(msg) {
        if (msg.channel.id !== getConfig().countingChannel) {
            return
        }

        if (!/^\d+$/.test(msg.content)) {
            msg.delete()
        }
    }
}

module.exports = CountingManager
