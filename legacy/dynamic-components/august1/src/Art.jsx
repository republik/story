import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import wordData from './wordData'
import { useBoundingClientRect, fontStyles } from '@project-r/styleguide'

const HEIGHT = 460
const PADDING_BOTTOM = 30

export default () => {
  const svgRef = useRef(null)

  const [width, setWidth] = useState(290)
  useEffect(() => {
    const interval = 150
    const d_in = 1000
    const d_out = 3000
    const d_up = 1200

    const svg = d3.select(svgRef.current)
    const padding_left = 15
    const padding_right = 15
    const padding_top = 30
    const height = HEIGHT

    const gWords = svg
      .append("g")
      .attr("transform", "translate(" + padding_left + "," + padding_top + ")")

    const partyColors = {
      SVP: "#4B8A3E",
      SP: "#F0554D",
      FDP: "#3872B5",
      //CVP: "#D6862B",
      CVP: "#ff9900",
      BDP: "#E6C820"
    }

    const freqFontsizes = {
      1: "100%",
      2: "140%",
      3: "160%",
      4: "180%",
      5: "280%",
      6: "300%",
      7: "330%",
      8: "360%"
    }

    function getFreqFontsize(myFreq) {
      let fontsize
      for (let freq in freqFontsizes) {
        if (myFreq >= freq) {
          fontsize = freqFontsizes[freq]
        }
      }
      return fontsize
    }

    function updateword(data) {
      // JOIN new data with old elements.
      const text = gWords.selectAll("text").data(data, function(d) {
        return d.word
      })
      // ENTER new elements present in new data.
      text
        .enter()
        .append("text")
        .attr("class", "enter")
        //.attr("dy", ".35em")
        .attr("y", 0)
        .style("font-size", function(d) {
          return getFreqFontsize(d.freq)
        })
        .style("fill-opacity", 0)
        .style("fill", function(d) {
          return partyColors[d.party]
        })
        .text(function(d) {
          return d.word
        })
        .attr("x", function(d, i) {
          return (
            Math.random() *
            (width - padding_left - padding_right - this.getComputedTextLength())
          )
        })
        .transition()
        .attr("y", (height - padding_top) / 3)
        .style("fill-opacity", 1)
        .duration(d_in)
        .ease(d3.easeLinear)
        .transition()
        .attr("y", height - PADDING_BOTTOM)
        .style("fill-opacity", 0)
        .duration(d_out)
        .remove()

      // UPDATE old elements present in new data.
      text
        .interrupt()
        .transition()
        .attr("y", (height * 1) / 12 + (Math.random() * height * 1) / 2)
        .style("fill-opacity", 1)
        .style("fill", function(d) {
          return partyColors[d.party]
        })
        .style("font-size", function(d) {
          return getFreqFontsize(d.freq)
        })
        .style("font-size", function(d) {
          return getFreqFontsize(d.freq)
        })
        .duration(d_up)
        //.attr("x", function(d) {return Math.random() * (width - padding_left - 100 - this.getComputedTextLength()); })
        .transition()
        .attr("y", (height * 5) / 6)
        .style("fill-opacity", 0)
        .duration(d_out)
        .ease(d3.easeLinear)
        .remove()
    }

    // first, shuffle all the words in a particular year
    for (let i_years = 0; i_years < wordData.length; i_years++) {
      d3.shuffle(wordData[i_years].words)
    }

    //these will keep track of the current positiion
    let i_years = 0
    let i_words = 0

    // Grab a random sample of letters from the alphabet, in alphabetical order.
    const theInterval = d3.interval(function() {
      // display the next word in the list
      updateword([{
        word: wordData[i_years].words[i_words].word,
        freq: wordData[i_years].words[i_words].freq,
        party: wordData[i_years].party
      }])

      // move forward in the wordlist, from year to year
      if (i_words + 1 != wordData[i_years].words.length) {
        i_words += 1
      } else {
        i_words = 0
        if (i_years + 1 != wordData.length) {
          i_years = i_years + 1
        } else {
          i_years = 0
        }
      }
    }, interval)

    const getWidth = () => {
      const rect = svgRef.current.getBoundingClientRect()
      if (rect.width !== width) {
        setWidth(rect.width)
      }
    }
    getWidth()
    window.addEventListener('resize', getWidth)

    return () => {
      theInterval.stop()
      window.removeEventListener('resize', getWidth)
    }
  }, [width])

  return <svg ref={svgRef}
    style={{
      //...fontStyles.serifBold,
      ...fontStyles.sansSerifMedium,
      display: 'block',
      marginBottom: PADDING_BOTTOM * -3,
      fontSize: width < 600
        ? 16
        : 24
    }}
    width='100%' height={HEIGHT} />
}
