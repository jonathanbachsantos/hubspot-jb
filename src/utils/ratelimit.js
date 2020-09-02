module.exports = async (ratelimit) => {

    const limit = [
        ratelimit['x-hubspot-ratelimit-daily'],
        ratelimit['x-hubspot-ratelimit-daily-remaining'],
        ratelimit['x-hubspot-ratelimit-interval-milliseconds'],
        ratelimit['x-hubspot-ratelimit-remaining'],
        ratelimit['x-hubspot-ratelimit-max'],
        ratelimit['x-hubspot-ratelimit-secondly'],
        ratelimit['x-hubspot-ratelimit-secondly-remaining']
    ]
    if ((limit.filter(val => val <= 1)).length)
        setTimeout(function () {
            limit.filter(val => val <= 1)
        }, 1000)
    
    return limit

}