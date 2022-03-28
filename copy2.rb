class Set
    #the three cards that the user inputs!!
    attr_reader :card1, :card2, :card3

    def initialize(card1, card2, card3)
        @card1= card1
        @card2= card2
        @card3 = card3
    end

    #we might need to move/fix stuff i'm kinda just putting down my ideas as they come lol

    #checks attributes of each card to see if they are the same 
    def checkEachCharacteristic(char1, char2, char3)
        result = false
        if char1 == char2 && char2 == char3
                result = true
        elsif char1 != char2 && char2 != char3 && char1 != char3
                result = true
        end

        return result
    end

    def checkIfSet
        #need to check each characterisitc to make a set
        isSet = false
        if(checkEachCharacteristic(card1.symbol, card2.symbol, card3.symbol) && checkEachCharacteristic(card1.color, card2.color, card3.color) && checkEachCharacteristic(card1.numSym, card2.numSym, card3.numSym) && checkEachCharacteristic(card1.shade, card2.shade, card3.shade))
            isSet = true
        end
    end
    #the cards need to be defined idk how though
    def removeSet(card1, card2, card3)
        removed = []

        if(isSet)
            firstSpot = tableCards.index(card1)
            tableCards.delete_at(firstSpot) #using delete_at instead of pop bc it allows you to remove a specific index

            secondSpot = tableCards.index(card2)
            tableCards.delete_at(secondSpot)
            
            thirdSpot = tableCards.index(card3)
            tableCards.delete_at(thirdSpot)
        end
    end

    #adds three cards to the table if a set is found (need to figure out how to remove the cards from the table array - Array.delete_at(index)?)
    def addThreeCards
        if(checkIfSet)
            for i in 1..3 do
                tableCards.dealtCards << deck1.cards.pop
            end
                
            tableCards.dealtCards.each { |card| puts card.to_s}
        end
    end

end
