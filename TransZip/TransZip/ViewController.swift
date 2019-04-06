//
//  ViewController.swift
//  TransZip
//
//  Created by Artem Tkachuk on 06/04/2019.
//  Copyright © 2019 Artem Tkachuk. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        var count = 0
        
        var timer = Timer()
        
        @IBAction func startPressed(sender: UIButton) {
            // 7
            timer = NSTimer.scheduledTimerWithTimeInterval(1, target: self, selector: #selector(ViewController.counter), userInfo: nil, repeats: true)
            
        }
        
    }


}

